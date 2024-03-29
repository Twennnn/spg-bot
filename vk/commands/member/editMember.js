import { Command } from '../command';
import { sceneEnter } from '../../utils';
import { Member } from '../../../db';
import { getCurrentNickname } from '../../../utils';
import { installCommands } from '../../../discord/commands/index.js';

export class EditMember extends Command {

    constructor() {
        super('edit_member', 10);
    }

    async execute(context) {
        const payload = await sceneEnter({
            slug: 'edit_member',
            context
        })

        if (!payload) {
            return;
        }
        const { nickname, newNickname, newVkId, newDiscordId, newColor, newDescription, newProbation, newPermission } = payload
        await Member.updateOne({ nickname: await getCurrentNickname(nickname) }, {
            nickname: await getCurrentNickname(newNickname),
            vkId: newVkId,
            discordId: newDiscordId,
            color: newColor,
            description: newDescription,
            probation: newProbation,
            permission: newPermission
        })
            .exec()
            .then(() => {
                context.send({
                    message: 'Изменения успешно сохранены!'
                });
            });
        installCommands()
    }
}