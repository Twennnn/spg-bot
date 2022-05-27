import { Command } from '../command';
import { hyperLink, sceneEnter } from '../../utils';
import { Member } from '../../../db';

export class DeleteMember extends Command {

    constructor() {
        super('delete_member', 10);
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
        await Member.deleteOne({ nickname })
            .then(() => {
                context.send(`👤 Игрок ${hyperLink(nickname)} успешно удален из базы данных`)
            });
    }
}