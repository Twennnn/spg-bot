import { client } from '../client';
import { createUser, Member } from '../../db';

client.updates.on('message_new', async (context, next) => {
        const member = await Member.findOne({ 'vkId': `${context.senderId}` });
        if (member) {
            context.member = member
        } else {
            const member = await createUser(context.senderId)
                .catch(() => null);

            if (member) {
                context.member = member;
            } else {
                await context.send('🤕 Отправьте сообщение повторно. Произошла ошибка при регистрации аккаунта!')

                return;
            }
        }

        next();
    }
)