import { Command } from '../command';
import { hyperLink, sceneEnter } from '../../utils';
import { Blacklist } from '../../../db';

export class DeleteFromBlacklist extends Command {

    constructor() {
        super('delete_from_blacklist', 5);
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
            .then(() => {
                context.send(`👤 Игрок ${hyperLink(nickname)} успешно удален из черного списка`)
            });
    }
}