import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { Member } from '../../../db';

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
            .exec();

    }
}