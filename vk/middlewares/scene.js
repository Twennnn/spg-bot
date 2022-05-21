import { client, sceneManager } from '../client';

client.updates.on('message_new', sceneManager.middleware);
client.updates.on('message_new', async (context, next) => {

    if (context.scene.current) {
        const command = context?.messagePayload?.command;

        if (command) {
            await context.scene.leave({
                canceled: true
            });

            if (command === 'cancel') {
                context.send('👌🏻 Команда отменена');

                context.state.command = 'help';
            } else {
                context.state.command = command;
            }

            next();

            return;
        }

        return context.scene.reenter();
    }

    next();
});