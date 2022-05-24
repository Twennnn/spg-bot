import { VK_BOT_ID } from '../../utils';

export function hyperLink(message, link = VK_BOT_ID) {
    return `[${link}|${message}]`;
}