import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { hearManager } from '../client';

import { Start } from './start';
import { Help } from './help';
import { Info } from './info';
import { Description, SetDescription } from './description';
import { Color, SetColor } from './color';
import { Member, AddMember, DeleteMember } from './member';
import { Blacklist, AddToBlacklist, DeleteFromBlacklist } from './blacklist';
import { hyperLink } from '../utils';
import { permissions } from '../../utils';

const { stripIndents } = commonTags;

const commands = [
    Start,

    Help,

    Info,

    Description,
    SetDescription,

    Color,
    SetColor,

    Member,
    AddMember,
    DeleteMember,

    Blacklist,
    AddToBlacklist,
    DeleteFromBlacklist
];

commands.forEach((Command) => {
    const { name } = new Command();

    hearManager.hear(
        [
            (text, { state }) => (
                state.command === name
            ),
            `/${name}`
        ],
        (context, next) => {
            const command = new Command();

            if (Number(context.member.permission) < Number(command.permission)) {
                return context.send({
                    message: stripIndents`
                🙄 Для вызова этой команды необходима роль:${hyperLink(permissions.get(command.permission))}!
                
                Текущая роль: ${hyperLink(permissions.get(context.member.permission))}
                `,
                keyboard: Keyboard.builder()
                    .textButton({
                        label: 'Отмена',
                        color: ButtonColor.NEGATIVE,
                        payload: {
                            command: 'start'
                        }
                    })
                    .inline()
                });
            }

            command.execute(context, next);
        }
    );
});

hearManager.onFallback((context, next) => {
    if (context.isFromUser) {
        new Help()
            .execute(context, next);
    }
});