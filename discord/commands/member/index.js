import commonTags from 'common-tags';
import { MessageEmbed } from 'discord.js';
import { bold, roleMention, userMention } from '@discordjs/builders';

import { Command } from '../command';
import { buildPlayerAvatarUrl } from '../../../utils';
import { getAllMembers } from '../../../db/index.js';

const { stripIndents } = commonTags;

export class Member extends Command {

    constructor() {
        super({
            name: 'member',
            description: 'Получить информацию о жителе города'
        });
    }

    async install() {
        this.command.options = [{
            type: 'STRING',
            name: 'nickname',
            description: 'Имя жителя города',
            choices: (await getAllMembers())
                .map(({ nickname }) => ({
                    name: nickname,
                    value: nickname
                })),
            required: true
        }];
    }

    async execute(interaction) {
        const { value: nickname } = interaction.options.get('nickname', true);

        const { discordId, color, description} = (await getAllMembers())
            .find(({ nickname: memberNickname }) => memberNickname === nickname);

        const roles = [
            ...(await interaction.guild.members.fetch(discordId))
                .roles
                .cache
                .filter(({ name }) => name !== '@everyone')
                .keys()
        ]
            .map(roleMention)
            .join(' / ');

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle(`Информация о жителе: ${nickname}`)
                    .setDescription(stripIndents`
                    ${bold('Discord:')} ${userMention(discordId)}
                    
                    ${bold('Описание:')} ${description}
                    
                    
                    ${bold('Роли:')} ${roles}
                    
                    `)
            ])
            .setColor(color)
            .setListenEndColor(color)
            .setThumbnail(
                buildPlayerAvatarUrl(nickname)
            )
            .setDefaultButtons([])
            .setPaginationFormat('');

        builder.build()
    }
}