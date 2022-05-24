import { inlineCode } from '@discordjs/builders';

export function serializeList(list) {
    return list.length ?
        list
            .map(({ nickname, reason }) => (
                `${inlineCode(nickname)}${reason ? ` - ${reason}` : ''}`
            ))
            .join('\n')
        :
        '-';
}