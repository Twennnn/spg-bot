import { client } from '../client';
import { Member } from '../../db';

client.updates.on('message_new', async (context, next) => {
    const member = await Member.findOne({ 'vkId': `${context.senderId}` });
    if (!member) {
        return context.send()
    }
    context.member = member;
    next();
})