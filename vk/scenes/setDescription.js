import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { hyperLink } from '../utils';

const { stripIndents } = commonTags;

sceneManager.addScenes([
    new StepScene('set_description', {
        steps: [
            async (context) => {

                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: stripIndents`
                        📝 ${hyperLink(`Установить описание игрока ${context.member.nickname}: `)}
            
                        Отправьте текст, который будет вашим описанием.
            
                        Пример: "Я житель самого перспективного города и очень крутой строитель"
                        `,
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Отмена',
                                color: ButtonColor.NEGATIVE,
                                payload: {
                                    command: 'info'
                                }
                            })
                            .row()
                            .inline()
                    });
                }

                context.scene.state.description = String(context.text);

                return context.scene.step.next();
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, description } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    description
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
]);