import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { chunkArray } from '../../utils';
import { config } from '../../config';

const { members, probation_members } = config;
const allMembers = members.concat(probation_members);

sceneManager.addScenes([
    new StepScene('delete_member', {
        steps: [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    let index = 0;
                    let isFirstPage = true;
                    const chunkedOptionsList = chunkArray(allMembers, 5)
                    for (const chunkedOptions of chunkedOptionsList) {
                        const keyboard = Keyboard.builder()
                            .inline();
                        chunkedOptions.forEach(({ nickname }) => {
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
                                    command: 'member'
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


