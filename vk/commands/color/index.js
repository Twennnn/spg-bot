import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';

import { hyperLink } from '../../utils';

const { stripIndents } = commonTags;

export class Color extends Command {

    constructor() {
        super('color', 3);
    }

    execute(context) {
        context.send({
            message: stripIndents`
            🌈 ${hyperLink(`Цвет игрока ${context.member.nickname}: `)}
            
            На данный момент установлен: #${context.member.color}
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Изменить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'set_color'
                    }
                })
                .row()
                .textButton({
                    label: 'Отмена',
                    color: ButtonColor.NEGATIVE,
                    payload: {
                        command: 'info'
                    }
                })
                .row()
                .inline()
        });
    }
}

export * from './setColor';