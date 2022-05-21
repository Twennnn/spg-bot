import { client } from '../client';

import { VK_CONVERSATION_ID_OFFSET } from '../../utils';

client.updates.on('chat_kick_user', (context) => {
    if (context.senderId === context.eventMemberId) {
        client.api.messages.removeChatUser({
            chat_id: context.peerId - VK_CONVERSATION_ID_OFFSET,
            member_id: context.eventMemberId
        })
            .catch(() => {});
    }
});