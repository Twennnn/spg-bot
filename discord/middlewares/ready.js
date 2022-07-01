import { client } from '../client';

client.on('ready', () => {
    import('../commands');

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: 'за СПГ | /help',
            type: 'WATCHING'
        }]
    });

    console.log('----Дискорд Бот СПГ был успешно запущен----');
});