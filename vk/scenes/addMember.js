import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { getCurrentNickname, isCurrentNickname, valueInBase } from '../../utils';

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
                if (await valueInBase('nickname', await getCurrentNickname(nickname))) {
                    context.send('Ошибка! Пользователь с таким никнеймом уже есть в базе данных. Попробуйте еще раз!')

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
            async (context) => {
                const { vkId } = context.scene.state;

                if (vkId.toString().length !== 9) {
                    context.send('Ошибка! ID указан неверно. Попробуйте еще раз');

                    return context.scene.step.previous();
                }
                if (await valueInBase('vkId', vkId)) {
                    context.send('Ошибка! Данный id в ВК уже используется другим пользователем. Попробуйте еще раз!')

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
            async (context) => {
                const { discordId } = context.scene.state;

                if (discordId.length !== 18) {
                    context.send('Ошибка! ID указан неверно. Попробуйте еще раз');

                    return context.scene.step.previous();
                }
                if (await valueInBase('discordId', discordId)) {
                    context.send('Ошибка! Данный id в дискорд уже используется другим пользователем. Попробуйте еще раз!')

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
                                    probation: false,
                                    permission: 3
                                }
                            })
                            .textButton({
                                label: 'Испытательным сроком',
                                payload: {
                                    probation: true,
                                    permission: 3
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
                context.scene.state.permission = context.messagePayload.permission;

                return context.scene.step.next();
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, nickname, vkId, discordId, probation, permission } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    nickname,
                    vkId,
                    discordId,
                    probation,
                    permission
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
]);