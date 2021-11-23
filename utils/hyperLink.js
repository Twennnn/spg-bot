import { VK_BOT_ID } from './constans';

export function hyperLink(message, link = VK_BOT_ID) {
    return `[${link}|${message}]`;
}