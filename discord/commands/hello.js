import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { formatEmoji } from '@discordjs/builders';

import { Command } from './command';

const BOT_CHANNEL_ID = '503237208787124224';

export class Hello extends Command {

    constructor() {
        super({
            name: 'hello',
            description: 'Привет',
            options: [{
                type: 'STRING',
                name: 'person',
                description: 'Имя пользователя',
                required: true
            }]
        });
    }

    execute(interaction) {
        if (interaction.channelId !== BOT_CHANNEL_ID) {
            return;
        }

        const { value: person } = interaction.options.get('person', true);

        const builder = interaction.pagesBuilder()
            .setTitle(`Привет, ${person}`)
            .setPages([
                new MessageEmbed()
                    .setDescription('ку'),
                new MessageEmbed()
                    .setDescription('ку 2')
            ])
            .setComponents(
                new MessageActionRow()
                    .setComponents([
                        new MessageButton()
                            .setCustomId('hi')
                            .setLabel('отправь привет')
                            .setEmoji(
                                formatEmoji(908816711610925096)
                            )
                            .setStyle('SECONDARY')
                    ])
            )
            .setTriggers({
                name: 'hi',
                callback: () => {
                    interaction.followUp('privet');
                }
            })
            .setLoop(false)
            .setDefaultButtons([])
            .setPaginationFormat('')
            .setColor('#EA9ACC');

        if (person === 'twen') {
            builder.addPages(
                new MessageEmbed()
                    .setDescription('twen')
            );
        }

        builder.build();
    }
}