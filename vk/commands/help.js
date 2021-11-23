import { Command } from './command';
import { ButtonColor, Keyboard } from 'vk-io';

export class Help extends Command {

    constructor() {
        super('help');
    }

    execute(context) {
        context.send({
            message: 'ой я тут тебе помагить пришел',
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'хеллоу',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'hello'
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