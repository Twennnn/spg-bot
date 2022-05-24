import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';

const { stripIndents } = commonTags;

export class Member extends Command {

    constructor() {
        super('member', 10);
    }

    async execute(context) {
        context.send({
            message: stripIndents`
            🔎 Выбор действий для работы с людьми. Нажмите на одну из кнопок на клавиатуре!
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Добавить человека',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'add_member'
                    }
                })
                .row()
                .textButton({
                    label: 'Удалить человека',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'delete_member'
                    }
                })
        });
    }
}

export * from './addMember';
export * from './deleteMember';