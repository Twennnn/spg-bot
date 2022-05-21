import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { Member } from '../../../db';

export class DeleteMember extends Command {

    constructor() {
        super('delete_member');
    }


    async execute(context) {
        const payload = await sceneEnter({
            slug: 'delete_member',
            context
        });

        if (!payload) {
            return;
        }
        const { nickname } = payload
        await Member.deleteOne({ nickname });
    }
}