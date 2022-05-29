import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';
import { Member as Memberr } from '../../../db';
import { hyperLink } from '../../utils';

const { stripIndents } = commonTags;

export class Member extends Command {

    constructor() {
        super('member');
    }

    async execute(context) {
        const countAllMembers = await Memberr.find({ probation: { $exists: true }}).count();

        context.send({
            message: stripIndents`
            🔎 Жителей в базе данных на данный момент: ${hyperLink(countAllMembers)}
            
            Выбор действий для работы с людьми. Нажмите на одну из кнопок на клавиатуре!
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
                .textButton({
                    label: 'Редактировать человека',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'edit_member'
                    }
                })
        });
    }
}

export * from './addMember';
export * from './deleteMember';
export * from './editMember';