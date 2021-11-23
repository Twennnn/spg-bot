import { client } from '../client';

client.on('ready', () => {
    import('../commands');

    client.user.setPresence({
        status: 'online',
        activities: [{
            name: 'Самый Перспективный Город',
            type: 'PLAYING'
        }]
    });

    console.log('----Дискорд Бот СПГ был успешно запущен----');
});