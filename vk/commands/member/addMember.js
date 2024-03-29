import { Command } from '../command';
import { hyperLink, sceneEnter } from '../../utils';
import { getCurrentNickname } from '../../../utils';
import { Member } from '../../../db';
import { installCommands } from '../../../discord/commands/index.js';

export class AddMember extends Command {

    constructor() {
        super('add_member', 10);
    }


    async execute(context) {
        const payload = await sceneEnter({
            slug: 'add_member',
            context
        });

        if (!payload) {
            return;
        }
        const { nickname, vkId, discordId, probation, permission } = payload
        const memberCreate = new Member({
            nickname: await getCurrentNickname(nickname),
            vkId,
            discordId,
            probation,
            permission
        })
        await memberCreate.save()
            .then(async () => {
                context.send(`👤 Игрок ${hyperLink(await getCurrentNickname(nickname))} успешно добавлен в базу данных!`)
            });
        installCommands()
    }
}