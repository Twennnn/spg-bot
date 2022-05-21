import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { getCurrentNickname } from '../../../utils/getCurrentNickname';
import { Blacklist } from '../../../db';

export class AddToBlacklist extends Command {

    constructor() {
        super('add_to_blacklist');
    }


    async execute(context) {
        const payload = await sceneEnter({
            slug: 'add_to_blacklist',
            context
        });

        if (!payload) {
            return;
        }
        const { nickname, reason } = payload
        const addToBlacklist = new Blacklist({
            nickname: await getCurrentNickname(nickname),
            reason
        })
        await addToBlacklist.save();
    }
}