import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';
import { Blacklist as Blacklistt} from '../../../db';
import { serializeList } from '../../../discord/utils';

const { stripIndents } = commonTags;

export class Blacklist extends Command {

    constructor() {
        super('blacklist', 1);
    }

    async execute(context) {
        const blacklist = await Blacklistt.find();

        context.send({
            message: stripIndents`
                🔎 Черный список города:
                
                ${serializeList(blacklist)}
                `,

            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Добавить в черный список',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'add_to_blacklist'
                    }
                })
                .row()
                .textButton({
                    label: 'Удалить из черного списка',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'delete_from_blacklist'
                    }
                })
        });
    }
}

export * from './addToBlacklist';
export * from './deleteFromBlacklist';