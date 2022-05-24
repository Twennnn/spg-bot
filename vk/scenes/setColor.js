import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { hyperLink } from '../utils';
import { isValidHex } from '../../utils';

const { stripIndents } = commonTags;

sceneManager.addScenes([
    new StepScene('set_color', {
        steps: [
            async (context) => {

                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message:stripIndents`
                         📝 ${hyperLink(`Установка цвета для ${context.member.nickname}: `)}
            
                        Для установки цвета, отправьте нужный цвет.
            
                        Например: EA9ACC
            
                        Выбрать нужный цвет можно на сайте: https://htmlcolorcodes.com/
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
                            .inline(),
                        dont_parse_links: 1
                    });
                }

                context.scene.state.color = String(context.text);

                return context.scene.step.next();

            },
            (context) => {
                const { color } = context.scene.state;

                if (isValidHex(color)) {
                    context.send('Ошибка! Неверный формат цвета. Попробуйте еще раз')

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },

            async (context) => {
                const { color } = context.scene.state;

                await context.send(stripIndents`
                        📝 ${hyperLink(`Цвет игрока ${context.member.nickname} успешно уставновлен! `)}
            
                        Ваш новый цвет:
                        #${color}
                        `);

                return context.scene.step.next();
            }
        ],
        leaveHandler: (context) => {
            const { resolve, reject, color } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    color
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
])