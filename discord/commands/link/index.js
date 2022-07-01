import commonTags from 'common-tags';

import { Command } from '../command';
import { MessageEmbed } from 'discord.js';
import { buildCDNUrl, DEFAULT_COLOR } from '../../../utils/index.js';

const { stripIndents } = commonTags;

export class Link extends Command {

    constructor() {
        super({
            name: 'link',
            description: 'Ссылка на дискорд'
        });
    }

    async execute(interaction) {

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle('Ссылка на дискорд:')
            ])
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