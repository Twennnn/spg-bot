import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(`mongodb+srv://twennnn:${process.env.MONGODB_PASSWORD}@cluster0.kwssd.mongodb.net/SPG_Bot?retryWrites=true&w=majority`)
.then(async () => {
    console.log('----MongoDB был успешно запущен----');

    import('./discord');
    import('./vk');
})
.catch((error) => {
    console.error('Ошибка при подключении к MongoDB:');
    console.error(error)
})