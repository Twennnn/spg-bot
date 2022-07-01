import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { inlineCode } from '@discordjs/builders';

import { Command } from '../command';
import { buildCDNUrl, DEFAULT_COLOR, GITHUB_REP_LINK, VK_BOT_PUBLIC_LINK, VK, GITHUB } from '../../../utils/index.js';

export class Help extends Command {

    constructor() {
        super({
            name: 'help',
            description: 'Список доступных команд'
        });
    }

    async execute(interaction) {

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle('Доступные команды:')

                    .setFields([
                        {
                            name: 'Чёрный список города',
                            value: '/blacklist',
                        },
                        {
                            name: 'Ссылка на данный дискорд',
                            value: '/link'
                        },
                        {
                            name: 'Узнать больше о СПГ',
                            value: '/info',
                        },
                        {
                            name: 'Получить информацию о жителе города',
                            value: `/member ${inlineCode('<Никнейм жителя>')}`
                        },
                        {
                            name: 'Отправить объявление о собрании',
                            value: `/alert ${inlineCode('Текст')} | команда для писарей`
                        },
                        {
                            name: 'Команда, которую вы вызвали только что',
                            value: '/help'
                        }
                    ])
            ])
            .setComponents(
                new MessageActionRow()
                    .setComponents([
                        new MessageButton()
                            .setLabel('ВКонтакте')
                            .setURL(VK_BOT_PUBLIC_LINK)
                            .setEmoji(VK)
                            .setStyle('LINK'),
                        new MessageButton()
                            .setLabel('GitHub')
                            .setURL(GITHUB_REP_LINK)
                            .setEmoji(GITHUB)
                            .setStyle('LINK')
                    ])
            )
            .setColor(DEFAULT_COLOR)
            .setListenEndColor(DEFAULT_COLOR)
            .setThumbnail(
                buildCDNUrl('icons', interaction.guildId, interaction.guild.icon)
            )
            .setDefaultButtons([])
            .setPaginationFormat('');

        builder.build();
    }
}