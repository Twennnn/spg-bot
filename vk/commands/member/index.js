import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';
import { hyperLink } from '../../utils';
import { getListOfMembersInDB } from '../../../utils/getListOfMembersInDB.js';
import { countAllMembers } from '../../../db/index.js';

const { stripIndents } = commonTags;

export class Member extends Command {

    constructor() {
        super('member');
    }

    async execute(context) {

        context.send({
            message: stripIndents`
            🔎 Жителей в базе данных на данный момент: ${hyperLink(await countAllMembers())}
            
            ${await getListOfMembersInDB()}
            
            Выбор действий для работы с людьми. Нажмите на одну из кнопок на клавиатуре!
            `,
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Добавить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'add_member'
                    }
                })
                .row()
                .textButton({
                    label: 'Редактировать',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'edit_member'
                    }
                })
                .row()
                .textButton({
                    label: 'Удалить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'delete_member'
                    }
                })
                .row()
                .textButton({
                    label: 'Отмена',
                    color: ButtonColor.NEGATIVE,
                    payload: {
                        command: 'help'
                    }
                })
                .row()
                .inline()
        });
    }
}

export * from './addMember';
export * from './deleteMember';
export * from './editMember';