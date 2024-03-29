import commonTags from 'common-tags';
import { MessageEmbed } from 'discord.js';

import { Command } from '../command';
import { buildCDNUrl, DEFAULT_COLOR, serializeList } from '../../../utils/index.js';
import { Blacklist as BlacklistModel } from '../../../db/index.js';

const { stripIndents } = commonTags;

export class Blacklist extends Command {

    constructor() {
        super({
            name: 'blacklist',
            description: 'Чёрный список города'
        });
    }

    async execute(interaction) {

        const blacklist = await BlacklistModel.find();

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle('Чёрный список города:')
                    .setDescription(stripIndents`
                    Здесь представлен список людей, которые находятся в чёрном списке города с указанием причины.
                        
                    ${serializeList(blacklist)}
                    `)
            ])
            .setColor(DEFAULT_COLOR)
            .setListenEndColor(DEFAULT_COLOR)
            .setThumbnail(
                buildCDNUrl('icons', interaction.guildId, interaction.guild.icon)
            )
            .setDefaultButtons([])
            .setPaginationFormat('');

        builder.build()
    }
}