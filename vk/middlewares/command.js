import { client } from '../client';

client.updates.on('message_new', (context, next) => {
    const { messagePayload } = context;

    context.state.command = messagePayload?.command;

    next();
});