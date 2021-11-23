import { hearManager } from '../client';

import { Hello } from './hello';
import { Test } from './test';
import { Help } from './help';

const commands = [
    Help,
    Hello,
    Test
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