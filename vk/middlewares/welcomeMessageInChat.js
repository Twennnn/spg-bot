import commonTags from 'common-tags';

import { client } from '../client';

const { stripIndents } = commonTags;

client.updates.on(['chat_invite_user', 'chat_invite_user_by_link'], (context) => {
    if (context.isGroup) {
        return;
    }
    context.send(stripIndents`
    Добро пожаловать в СПГ!
    `)
})