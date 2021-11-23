import { Command } from './command';
import { ButtonColor, Keyboard } from 'vk-io';

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
                .inline()
        });
    }
}