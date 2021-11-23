import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from './command';

export class Test extends Command {

    constructor() {
        super('test');
    }

    execute(context) {
        context.send({
            message: 'тест',
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'тест',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        test: 1
                    }
                })
                .row()
                .textButton({
                    label: 'тест',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'test'
                    }
                })
        });
    }
}