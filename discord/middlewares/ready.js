import { client } from '../client';
import { installCommands } from '../commands/index.js';

client.on('ready', () => {
    installCommands();

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: 'за СПГ | /help',
            type: 'WATCHING'
        }]
    });

    console.log('----Дискорд Бот СПГ был успешно запущен----');
});