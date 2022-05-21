import { hearManager } from '../client';

import { Start } from './start';
import { Help } from './help';
import { Info } from './info';
import { Description, SetDescription } from './description';
import { Color, SetColor } from './color';
import { Member, AddMember, DeleteMember } from './member';
import { Blacklist, AddToBlacklist, DeleteFromBlacklist } from './blacklist';

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