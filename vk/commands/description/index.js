import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';

import { hyperLink } from '../../../utils';

const { stripIndents } = commonTags;

export class Description extends Command {

    constructor() {
        super('description');
    }

    async execute(context) {

        context.send({
            message: stripIndents`
            📝 ${hyperLink(`Описание игрока ${context.member.nickname}: `)}
            
            На данный момент установлено:
            ${context.member.description}
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Изменить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'set_description'
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

export * from './setDescription';