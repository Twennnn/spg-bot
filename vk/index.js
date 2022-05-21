import { client } from './client';

import './scenes';
import './commands';
import './middlewares';

client.updates.start()
    .then(() => {
        console.log('----ВК Бот СПГ был успешно запущен----')
    });

export * from './client';