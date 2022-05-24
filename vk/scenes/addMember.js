import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { getCurrentNickname } from '../../utils';
import { hyperLink } from '../utils';
import { isCurrentNickname } from '../../utils';

sceneManager.addScenes([
    new StepScene('add_member', {
        steps: [
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Введите никнейм игрока:',
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })
                            .row()
                            .inline()
                    });
                }

                context.scene.state.nickname = context.text;

                return context.scene.step.next();
            },
            async (context) => {
                const { nickname } = context.scene.state;

                if (!(await isCurrentNickname(nickname))) {
                    context.send('Данный никнейм не найден. Повторите попытку')

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Введите id игрока в ВК:',
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })
                            .row()
                            .inline()
                    });
                }

                context.scene.state.vkId = Number(context.text);

                return context.scene.step.next();
            },
            (context) => {
                const { vkId } = context.scene.state;

                if (vkId.toString().length !== 9) {
                    context.send('Ошибка! ID указан неверно. Попробуйте еще раз');

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Введите id игрока в Дискорде:',
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })
                            .row()
                            .inline()
                    });
                }

                context.scene.state.discordId = String(context.text);

                return context.scene.step.next();
            },
            (context) =>{
                const { discordId } = context.scene.state;

                if (discordId.length !== 18) {
                    context.send('Ошибка! ID указан неверно. Попробуйте еще раз');

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },
            (context) => {
                if (context.scene.step.firstTime || typeof context?.messagePayload?.probation === 'undefined') {
                    return context.send({
                        message: 'Кем является игрок?',
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Жителем',
                                payload: {
                                    probation: false
                                }
                            })
                            .textButton({
                                label: 'Испытательным сроком',
                                payload: {
                                    probation: true
                                }
                            })
                            .textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })
                            .row()
                            .inline()
                    });
                }

                context.scene.state.probation = context.messagePayload.probation;

                return context.scene.step.next();
            },

            async (context) => {
                const { nickname } = context.scene.state;

                await context.send(`👤 Игрок ${hyperLink(await getCurrentNickname(nickname))} успешно добавлен в базу данных`);

                return context.scene.step.next(); // Automatic exit, since this is the last scene
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, nickname, vkId, discordId, probation } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    nickname,
                    vkId,
                    discordId,
                    probation
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
]);