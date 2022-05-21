import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { Member } from '../../../db';

export class SetColor extends Command {

    constructor() {
        super('set_color');
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
            .exec();
    }
}