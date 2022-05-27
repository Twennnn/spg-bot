import commonTags from 'common-tags';

import { Command } from '../command';
import { hyperLink, sceneEnter } from '../../utils';
import { Member } from '../../../db';

const { stripIndents } = commonTags;

export class SetDescription extends Command {

    constructor() {
        super('set_description', 3);
    }


    async execute(context) {

        const payload = await sceneEnter({
            slug: 'set_description',
            context
        });

        if (!payload) {
            return;
        }
        const { description } = payload
        await Member.updateOne({ vkId: context.senderId }, {
            description: description
        })
            .exec()
            .then(() => {
                context.send(stripIndents`
                    📝 ${hyperLink(`Описание игрока ${context.member.nickname} успешно установлено! `)}
            
                    Ваше новое описание:
                    ${description}
                    `);
            });

    }
}