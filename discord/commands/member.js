import commonTags from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { roleMention } from '@discordjs/builders';

import { config } from '../../config';

import { Command } from './command';
import { DEFAULT_COLOR, buildPlayerAvatarUrl } from '../../utils';

const { stripIndents } = commonTags;
const { members, probation_members } = config;

export class Member extends Command {

    constructor() {
        super({
            name: 'member',
            description: 'Получить информацию о жителе города',
            options: [{
                type: 'STRING',
                name: 'nickname',
                description: 'Имя жителя города',
                choices: [...config.members, ...config.probation_members]
                    .map(({ nickname }) => ({
                        name: nickname,
                        value: nickname
                    })),
                required: true
            }]
        });
    }

    async execute(interaction) {
        const { value: nickname } = interaction.options.get('nickname', true);
        const { discord_id, color = DEFAULT_COLOR } = [...members, ...probation_members]
            .find(({ nickname: memberNickname }) => memberNickname === nickname);

        const roles = [
            ...(await interaction.guild.members.fetch(discord_id))
                .roles
                .cache
                .filter(({ name }) => name !== '@everyone')
                .keys()
        ]
            .map(roleMention)
            .join(' / ');

        interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`Информация о жителе:  ${nickname}`)
                    .setDescription(stripIndents`
                    ${roles}
                    
                    `)
                    .setFields()
                    .setThumbnail(
                        buildPlayerAvatarUrl(nickname)
                    )
                    .setColor(color)
            ]
        });
    }
}