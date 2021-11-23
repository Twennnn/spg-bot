import { hearManager } from '../client';

import { Start } from './start';
import { Help } from './help';
import { Hello } from './hello';
import { Test } from './test';
import { Info } from './info';

const commands = [
    Start,
    Help,
    Hello,
    Test,
    Info
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