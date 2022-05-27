import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { isCurrentNickname } from '../../utils';
import { ButtonColor, Keyboard } from 'vk-io';

sceneManager.addScenes([
    new StepScene('add_to_blacklist', {
        steps: [
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Введите имя игрока, которого вы хотите добавить в черный список',
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
                    context.send({
                        message: 'Данный никнейм не найден. Повторите попытку',
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

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Укажите причину добавления в черный список',
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

                context.scene.state.reason = context.text;

                return context.scene.step.next();
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, nickname, reason } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    nickname,
                    reason
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
])