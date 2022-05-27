import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';
import { StepScene } from '@vk-io/scenes';

import { sceneManager } from '../client';
import { chunkArray, getCurrentNickname, getPermissionRoleName, isCurrentNickname, isValidHex } from '../../utils';
import { getValueByNickname, Member } from '../../db';
import { hyperLink } from '../utils';
import { getProbationRoleName } from '../../utils';

const { stripIndents } = commonTags;

sceneManager.addScenes([
    new StepScene('edit_member', {
        steps: [
            (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    return context.send({
                        message: 'Введите никнейм человека, чьи данные вы хотите изменить',
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

                if (!await Member.findOne({ nickname: await getCurrentNickname(nickname) })) {
                    context.send('Ошибка! Пользователя с данным никнеймом нет в базе данных');

                    return context.scene.step.previous();
                }

                return context.scene.step.next();
            },
            async (context) => {
                if (context.scene.step.firstTime || typeof context?.messagePayload?.chooseOption === 'undefined') {
                    let isFirstPage = true;
                    const optionsList = [
                        {name:'Никнейм',
                            chooseOption: 'nickname'},
                        {name: 'ВК id',
                            chooseOption: 'vkId'},
                        {name: 'Дискорд id',
                            chooseOption: 'discordId'},
                        {name: 'Цвет',
                            chooseOption: 'color'},
                        {name: 'Описание',
                            chooseOption: 'description'},
                        {name: 'Житель/исп.срок',
                            chooseOption: 'probation'},
                        {name: 'Роль',
                            chooseOption: 'permission'}
                    ]
                    for (const chunkedOptions of chunkArray(optionsList, 6)) {
                        const keyboard = Keyboard.builder()
                            .inline();

                        chunkedOptions.forEach(({ name, chooseOption }) => {
                            keyboard.textButton({
                                label: name,
                                payload: {
                                    chooseOption
                                }
                            })
                                .row();
                        });

                        await context.send({
                            message: isFirstPage ?
                                'Выберите что вы хотите изменить у пользователя:'
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

                context.scene.state.chooseOption = context.messagePayload.chooseOption;

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'nickname') {
                    const nowNickname = await getValueByNickname(nickname, 'nickname');

                    return context.send(stripIndents`
                        На данный момент у пользователя установлен никнейм: ${hyperLink(nowNickname)}
                           
                        Введите новый никнейм:
                        `);
                }
                if (!(chooseOption === 'nickname')) {
                    return context.scene.step.next();
                }

                context.scene.state.newNickname = await getCurrentNickname(context.text);

                return context.scene.step.next();
            },
            async(context) => {
                const { newNickname } = context.scene.state;

                if (newNickname){
                    if (await isCurrentNickname(newNickname)) {
                        context.send('Никнейм будет установлен')
                    } else {
                        context.send('Данный никнейм не найден. Повторите попытку')

                        return context.scene.step.previous();
                    }
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'vkId') {
                    const nowVkId = await getValueByNickname(nickname, 'vkId');

                    return context.send(stripIndents`
                        На данный момент у пользователя установлен id в ВК: ${hyperLink(nowVkId)}
                           
                        Введите новый id:
                        `)
                }
                if (chooseOption !== 'vkId') {
                    return context.scene.step.next();
                }

                context.scene.state.newVkId = context.text;

                return context.scene.step.next();
            },
            (context) => {
                const { newVkId } = context.scene.state;

                if (newVkId) {
                    if (newVkId.toString().length === 9) {
                        context.send('ID в ВК будет успешно уставновлено');
                    } else {
                        context.send('Ошибка! ID указан неверно. Попробуйте еще раз')

                        return context.scene.step.previous();
                    }
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'discordId') {
                    const nowDiscordId = await getValueByNickname(nickname, 'discordId');

                    return context.send(stripIndents`
                        На данный момент у пользователя установлен ID в Дискорд: ${hyperLink(nowDiscordId)}
                           
                        Введите новый ID в Дискорд :
                        `);
                }
                if (chooseOption !== 'discordId') {
                    return context.scene.step.next();
                }

                context.scene.state.newDiscordId = context.text;

                return context.scene.step.next();
            },
            (context) => {
                const { newDiscordId } = context.scene.state;

                if (newDiscordId) {
                    if (newDiscordId.length === 18) {
                        context.send('ID в Дискорде будет успешно уставновлено');
                    } else {
                        context.send('Ошибка! ID указан неверно. Попробуйте еще раз');

                        return context.scene.step.previous();
                    }
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'color') {
                    const nowColor = await getValueByNickname(nickname, 'color');

                    return context.send({
                        message:stripIndents`
                        📝 На данный момент у пользователя установлен цвет: ${hyperLink(nowColor)}
                        
                        Для установки цвета, отправьте нужный цвет.
                        
                        Выбрать нужный цвет можно на сайте: https://htmlcolorcodes.com/
                        `,
                        dont_parse_links: 1
                    })
                }
                if (chooseOption !== 'color') {
                    return context.scene.step.next();
                }

                context.scene.state.newColor = context.text;

                return context.scene.step.next();
            },
            (context) => {
                const { newColor } = context.scene.state;

                if (newColor) {
                    if (isValidHex(newColor)) {
                        context.send('Цвет будет успешно уставновлен');
                    } else {
                        context.send('Ошибка! Неверный формат цвета. Попробуйте еще раз')

                        return context.scene.step.previous();
                    }
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'description') {
                    return context.send(stripIndents`
                        На данный момент у пользователя установлен описание:
                        
                        "${await getValueByNickname(nickname, 'description')}"
                        
                        Введите новое описание:
                        `);
                }
                if (chooseOption !== 'description') {
                    return context.scene.step.next();
                }

                context.scene.state.newDescription = context.text;

                return context.scene.step.next();
            },
            (context) => {
                const { newDescription } = context.scene.state;

                if (newDescription) {
                        context.send('Описание будет успешно уставновлено');
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'probation') {
                    const nowProbation = getProbationRoleName(await getValueByNickname(nickname, 'probation'));

                    return context.send({
                        message:stripIndents`
                        На данный момент у пользователя установлена роль: ${hyperLink(nowProbation)}
                           
                        Выберите какую роль установить:
                        `,
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Житель',
                                payload: {
                                    newProbation: false
                                }
                            })
                            .textButton({
                                label: 'Испытательный срок',
                                payload: {
                                    newProbation: true
                                }
                            })
                            .row()
                            .inline()
                    });
                }
                if (chooseOption !== 'probation') {
                    return context.scene.step.next();
                }

                context.scene.state.newProbation = context.messagePayload.newProbation;

                return context.scene.step.next();
            },
            (context) => {
                const { newProbation } = context.scene.state;

                if (typeof newProbation === 'boolean') {
                    context.send('Выбранная роль будет успешно установлена!')
                }

                return context.scene.step.next();
            },
            async (context) => {
                const { chooseOption, nickname } = context.scene.state;

                if (context.scene.step.firstTime && chooseOption === 'permission') {
                    const nowPermission = getPermissionRoleName(await getValueByNickname(nickname, 'permission'));

                    return context.send({
                        message:stripIndents`
                        На данный момент у пользователя установлена роль: ${hyperLink(nowPermission)}
                           
                        Выберите какую роль установить:
                        `,
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: '🎩 Пользователь',
                                payload: {
                                    newPermission: 1
                                }
                            })
                            .row()
                            .textButton({
                                label: '👩‍🌾 Житель',
                                payload: {
                                    newPermission: 3
                                }
                            })
                            .row()
                            .textButton({
                                label: '⚔ Модератор',
                                payload: {
                                    newPermission: 5
                                }
                            })
                            .row()
                            .textButton({
                                label: '⚙ Администратор',
                                payload: {
                                    newPermission: 10
                                }
                            })
                            .row()
                            .inline()
                    });
                }
                if (chooseOption !== 'permission') {
                    return context.scene.step.next();
                }

                context.scene.state.newPermission = context.messagePayload.newPermission;

                return context.scene.step.next();
            },
            (context) => {
                const { newPermission } = context.scene.state;

                if (newPermission) {
                    context.send('Выбранная роль будет успешно установлена!')
                }

                return context.scene.step.next();
            },
            async (context) => {
                if (context.scene.step.firstTime || typeof context?.messagePayload?.proceed === 'undefined') {
                    return context.send({
                        message: 'Хотите ли вы изменить еще и другие параметры?',
                        keyboard: Keyboard.builder()
                            .textButton({
                                label: 'Да, продолжить',
                                payload: {
                                    proceed: true
                                }
                            })
                            .textButton({
                                label: 'Нет, сохранить изменения',
                                payload: {
                                    proceed: false
                                }
                            })
                            .row()
                            .inline()
                    })
                }

                context.scene.state.proceed = context.messagePayload.proceed;

                return context.scene.step.next();
            },
            async (context) => {
                const { proceed } = context.scene.state;

                if (proceed) {
                    return context.scene.step.go(2)
                } else {
                    return context.scene.step.next()
                }
            }
        ],
        leaveHandler: (context) => {
            const {
                resolve,
                reject,
                nickname,
                newNickname,
                newVkId,
                newDiscordId,
                newColor,
                newDescription,
                newProbation,
                newPermission
            } = context.scene.state;

            if (!context.scene.canceled) {
                resolve({
                    nickname,
                    newNickname,
                    newVkId,
                    newDiscordId,
                    newColor,
                    newDescription,
                    newProbation,
                    newPermission
                });
            } else {
                reject(
                    new Error('Canceled by user.')
                );
            }
        }
    })
])