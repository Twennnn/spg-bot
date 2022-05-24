import { Command } from '../command';
import { ButtonColor, Keyboard } from 'vk-io';
import { hyperLink } from '../../utils';

export class Start extends Command {

    constructor() {
        super('start');
    }

    execute(context) {
        context.send({
            message: `👋 Для того, чтобы начать пользовать ${hyperLink('СПГ - Бот')}, нажите на кнопку "Старт"`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Старт',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'help'
                    }
                })
        });
    }
}