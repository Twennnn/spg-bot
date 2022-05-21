import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { members } from '../../config';
import { chunkArray } from '../../utils/chunkArray';
import { hyperLink } from '../../utils';

sceneManager.addScenes([
    new StepScene('delete_member', {
        steps: [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    let isFirstPage = true;
                    for (const chunkedMembers of chunkArray(members, 6)) {
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
                            keyboard
                        })

                        isFirstPage = false;
                    }

                    return;
                }

                context.scene.state.nickname = context.text;

                return context.scene.step.next();
            },
            async (context) => {
                const { nickname } = context.scene.state;

                await context.send(`👤 Игрок ${hyperLink(nickname)} успешно удален из базы данных`);

                return context.scene.step.next(); // Automatic exit, since this is the last scene
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


