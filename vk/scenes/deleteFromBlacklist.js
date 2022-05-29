import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { blacklist } from '../../config';
import { chunkArray } from '../../utils';

sceneManager.addScenes([
    new StepScene('delete_from_blacklist', {
        steps: [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    let index = 0;
                    let isFirstPage = true;
                    const chunkedOptionsList = chunkArray(blacklist, 5)
                    for (const chunkedMembers of chunkedOptionsList) {
                        const keyboard = Keyboard.builder()
                            .inline();

                        chunkedMembers.forEach(({ nickname }) => {
                            keyboard.textButton({
                                label: nickname
                            })
                                .row();
                        });
                        if (index === chunkedOptionsList.length - 1) {
                            keyboard.textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'help'
                                }
                            })
                        }
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
                        index++;
                    }

                    return;
                }

                context.scene.state.nickname = context.text;

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