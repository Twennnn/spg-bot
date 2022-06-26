import commonTags from 'common-tags';
import { ButtonColor, Keyboard } from 'vk-io';

import { Command } from '../command';
import { Blacklist as Blacklistt} from '../../../db';
import { serializeList } from '../../../utils';

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
                
                ${serializeList(blacklist, 'vk')}
                `,

            keyboard: Keyboard.builder()
                .textButton({
                    label: 'Добавить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'add_to_blacklist'
                    }
                })
                .textButton({
                    label: 'Удалить',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'delete_from_blacklist'
                    }
                })
                .inline()
        });
    }
}

export * from './addToBlacklist';
export * from './deleteFromBlacklist';