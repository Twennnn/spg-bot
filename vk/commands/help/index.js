import { Command } from '../command';
import { ButtonColor, Keyboard } from 'vk-io';
import { hyperLink } from '../../utils';

export class Help extends Command {

    constructor() {
        super('help');
    }

    execute(context) {
        context.send({
            message: `👋 Для работы с ${hyperLink('СПГ - Бот')} вам необходимо выбрать нужную команду на клавиатуре`,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Информация о себе',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'info'
                    }
                })
                .row()
                .textButton({
                    label: 'Чёрный список',
                    payload: {
                        command: 'blacklist'
                    }
                })
                .textButton({
                    label: 'Жители',
                    payload: {
                        command: 'member'
                    }
                })
        });
    }
}