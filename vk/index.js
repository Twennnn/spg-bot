import { client } from './client';

import './middlewares';
import './commands';

client.updates.start()
    .then(() => {
        console.log('----ВК Бот СПГ был успешно запущен----')
    });