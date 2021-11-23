import { Command } from './command';
import { ButtonColor, Keyboard } from 'vk-io';
import { client } from '../client';

export class Hello extends Command {

    constructor() {
        super('hello');
    }

    async execute(context) {
/*        const photo = await context.upload.messagePhoto({
            source: {
                value: 'https://cdn.discordapp.com/attachments/909126272293167124/909126303704313896/1712ed9fc3acf999adc8f8733a5aec20.png'
            }
        });*/

        context.send({
            message: 'хай',
            attachment: 'photo-208820464_457239018',
            keyboard: Keyboard.builder()
                .textButton({
                    label: 'тест1',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        test: 1
                    }
                })
                .row()
                .textButton({
                    label: 'тест2',
                    color: ButtonColor.SECONDARY,
                    payload: {
                        command: 'test'
                    }
                })
        });
    }
}