import commonTags from 'common-tags';
import { MessageActionRow, MessageButton, MessageEmbed, Guild } from 'discord.js';
import { bold, formatEmoji, inlineCode } from '@discordjs/builders';

import { config } from '../../config';

import { Command } from './command';
import {
    buildCDNUrl,
    DEFAULT_COLOR,
    DISCORD_LINK,
    VK,
    VK_PUBLIC_LINK,
    YOUTUBE,
    YOUTUBE_CHANNEL_LINK
} from '../../utils';

const { stripIndents } = commonTags;
const { member_role_id, probation_member_role_id, overworld_coordinates, hell_coordinates, members, probation_members, blacklist } = config;

export class Info extends Command {

    constructor() {
        super({
            name: 'info',
            description: 'Узнать больше о СПГ'
        });
    }

    async execute(interaction) {
        const membersCount = await this.countRoleMembers(interaction, member_role_id);
        const probationMembersCount = await this.countRoleMembers(interaction, probation_member_role_id);

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle('Немного информации о городе СПГ')
                    .setDescription(stripIndents`
                    ${bold('Самый перспективный город? Это именно про нас!')}
                    Если вам интересны:
                    ${inlineCode('Миниигры, Рестораны, Магазин артов, Казино,')} 
                    Тогда вам нужно обязательно побывать в нашем горде!
                    `)
                    .setFields([
                        {
                            name: 'Координаты города:',
                            value: inlineCode(overworld_coordinates),
                            inline: true
                        }, {
                            name: 'Координаты в аду:',
                            value: inlineCode(hell_coordinates),
                            inline: true
                        }
                    ]),
                new MessageEmbed()
                    .setTitle('Полезные ссылки СПГ')
                    .setDescription(stripIndents`
                    ${inlineCode('Не знаете где нас можно найти?')}
                    Тогда эта вкладка специально для вас! Здесь вы можете легко найти ссылки на все наши ресурсы
                    `)
                    .setFields([
                        {
                            name: `${YOUTUBE} YouTube ${YOUTUBE}`,
                            value: `[Ссылка](${YOUTUBE_CHANNEL_LINK})`,
                            inline: true
                        },{
                            name: `${VK} Паблик в ВК ${VK}`,
                            value: `[Ссылка](${VK_PUBLIC_LINK})`,
                            inline: true
                        }
                    ])
                    .setFooter(`Так же ссылочка на этот дискорд (${DISCORD_LINK})`),
                new MessageEmbed()
                    .setTitle('Список жителей СПГ')
                    .setDescription(stripIndents`
                    Количество жителей: ${inlineCode(membersCount)}
                    Людей с испытательным сроком: ${inlineCode(probationMembersCount)}
                    `)
                    .setFields([
                        {
                            name: 'Жители города:',
                            value: this.serializeList(members),
                            inline: true
                        },
                        {
                            name: 'Испытательный срок:',
                            value: this.serializeList(probation_members),
                            inline: true
                        }
                    ])
                    .setFooter('Узнать больше о жителе: /member nickname'),
                new MessageEmbed()
                    .setTitle('Чёрный список СПГ')
                    .setDescription(stripIndents`
                        Здесь представлен список людей, которые находятся в чёрном списке города с указанием причины.
                        
                        ${this.serializeList(blacklist)}
                        `)
            ])
            .setComponents(
                new MessageActionRow()
                    .setComponents([
                        new MessageButton()
                            .setCustomId('Information')
                            .setStyle('SECONDARY')
                            .setLabel('Информация')
                            .setEmoji('909460810609344553'),
                        new MessageButton()
                            .setCustomId('Links')
                            .setStyle('SECONDARY')
                            .setLabel('Полезные ссылки')
                            .setEmoji('909460989966188594'),
                        new MessageButton()
                            .setCustomId('People')
                            .setLabel('Список жителей')
                            .setStyle('SECONDARY')
                            .setEmoji('909846571443707975'),
                        new MessageButton()
                            .setCustomId('BlackList')
                            .setLabel('Чёрный список')
                            .setStyle('SECONDARY')
                            .setEmoji('909844993861120030')
                    ])
            )
            .setTriggers([
                {
                    name: 'Information',
                    callback: () => {
                        builder.setPage(1)
                    }
                },
                {
                    name: 'Links',
                    callback: () => {
                        builder.setPage(2)
                    }
                },
                {
                    name: 'People',
                    callback: () => {
                        builder.setPage(3)
                    }
                },
                {
                    name: 'BlackList',
                    callback: () => {
                        builder.setPage(4)
                    }
                }
            ])
            .setColor(DEFAULT_COLOR)
            .setThumbnail(
                buildCDNUrl('icons', interaction.guildId, interaction.guild.icon)
            )
            .setDefaultButtons([])
            .setPaginationFormat('');

            builder.build();
    }

    serializeList(list) {
        return list.length ?
            list
                .map(({ nickname, reason }) => (
                    `${inlineCode(nickname)}${reason ? ` - ${reason}` : ''}`
                ))
                .join('\n')
            :
            '-';
    }

    async countRoleMembers(interaction, roleId) {
        await interaction.guild.members.fetch();

        const { size } = await interaction.guild.roles.cache.get(roleId)
            .members;

        return size;
    }


}
