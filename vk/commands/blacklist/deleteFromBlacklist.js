import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { Blacklist } from '../../../db';

export class DeleteFromBlacklist extends Command {

    constructor() {
        super('delete_from_blacklist');
    }


    async execute(context) {
        const payload = await sceneEnter({
            slug: 'delete_from_blacklist',
            context
        });

        if (!payload) {
            return;
        }
        const { nickname } = payload
        await Blacklist.deleteOne({ nickname })
    }
}