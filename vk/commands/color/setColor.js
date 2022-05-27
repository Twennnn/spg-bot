import commonTags from 'common-tags';

import { Command } from '../command';
import { hyperLink, sceneEnter } from '../../utils';
import { Member } from '../../../db';

const { stripIndents } = commonTags;

export class SetColor extends Command {

    constructor() {
        super('set_color', 3);
    }


    async execute(context) {

        const payload = await sceneEnter({
            slug: 'set_color',
            context
        });

        if (!payload) {
            return
        }
        const { color } = payload
        await Member.updateOne({ vkId: context.senderId}, {
            color
        })
            .exec()
            .then(() => {
                context.send(stripIndents`
                    📝 ${hyperLink(`Цвет игрока ${context.member.nickname} успешно уставновлен! `)}
            
                    Ваш новый цвет:
                    #${color}
                    `);
            });
    }
}