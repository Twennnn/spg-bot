import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { getCurrentNickname } from '../../../utils/getCurrentNickname';
import { Member } from '../../../db';

export class AddMember extends Command {

    constructor() {
        super('add_member');
    }


    async execute(context) {
        const payload = await sceneEnter({
            slug: 'add_member',
            context
        });

        if (!payload) {
            return;
        }
        const { nickname, vkId, discordId, probation } = payload
        const memberCreate = new Member({
            nickname: await getCurrentNickname(nickname),
            vkId,
            discordId,
            probation
        })
        await memberCreate.save();
    }
}