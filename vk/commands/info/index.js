import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';

import { hyperLink } from '../../../utils';

const { stripIndents } = commonTags;

export class Info extends Command {

    constructor() {
        super('info');
    }

    async execute(context) {

        context.send({
            message: stripIndents`
            🔎 ${hyperLink(`Информация об игроке ${context.member.nickname} : `)}
            
            Роль: ${hyperLink(this.getRole(context.member.probation))}
            Статус: ${hyperLink('Активный/Заморозка')}
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: '📝 Описание',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'description'
                    }
                })
                .row()
                .textButton({
                    label: '🌈 Цвет',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'color'
                    }
                })
                .row()
                .inline()
        });
    }

    getRole(boolean) {
        if (boolean === true) {
            return 'Испытательный срок';
        } else {
            return 'Житель';
        }
    }
}