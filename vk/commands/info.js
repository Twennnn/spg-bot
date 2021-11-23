import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from './command';

import { hyperLink } from '../../utils';

export class Info extends Command {

    constructor() {
        super('info');
    }

    execute(context) {
        context.send({
            message: `
            🔎 ${hyperLink('Информация об игроке Twennnn: ')}
            
            иоавоовоив
            тестим
            
            оп оппо 
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Описание',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: ''
                    }
                })
                .row()
                .textButton({
                    label: 'Ссылки',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: ''
                    }
                })
                .row()
                .textButton({
                    label: 'Цвет',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: ''
                    }
                })
                .inline()
        });
    }
}