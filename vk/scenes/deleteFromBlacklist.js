import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { blacklist } from '../../config';
import { chunkArray } from '../../utils';
import { hyperLink } from '../utils';

sceneManager.addScenes([
    new StepScene('delete_from_blacklist', {
        steps: [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    let isFirstPage = true;
                    for (const chunkedMembers of chunkArray(blacklist, 6)) {
                        const keyboard = Keyboard.builder()
                            .inline();

                        chunkedMembers.forEach(({ nickname }) => {
                            keyboard.textButton({
                                label: nickname
                            })
                                .row();
                        });
                            keyboard.textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })

                        await context.send({
                            message: isFirstPage ?
                                '🔎 Для того чтобы удалить человека нажмите на его никнейм.'
                                :
                                '&#4448;',
                            keyboard: keyboard
                                .row()
                                .inline()
                        });

                        isFirstPage = false;
                    }

                    return;
                }

                context.scene.state.nickname = context.text;

                return context.scene.step.next();
            },
            async (context) => {
                const { nickname } = context.scene.state;

                await context.send(`👤 Игрок ${hyperLink(nickname)} успешно удален из черного списка`)

                return context.scene.step.next();
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, nickname } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    nickname
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
])