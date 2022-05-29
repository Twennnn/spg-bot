import { inlineCode } from '@discordjs/builders';
import { hyperLink } from '../vk/utils';

export function serializeList(list, type = 'discord') {
    switch (type) {
        case 'discord':
            return list.length ?
                list
                    .map(({ nickname, reason }) => (
                        `${inlineCode(nickname)}${reason ? ` - ${reason}` : ''}`
                    ))
                    .join('\n')
                :
                '-';

        case 'vk':
            return list.length ?
                list
                    .map(({ nickname, reason }) => (
                        `${hyperLink(nickname)}${reason ? ` - ${reason}` : ''}`
                    ))
                    .join('\n')
                :
                '-';
    }
}