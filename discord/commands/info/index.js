import commonTags from 'common-tags';
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import { bold, inlineCode } from '@discordjs/builders';

import { config } from '../../../config';

import { Command } from '../command';
import {
    BOOKNQUILL,
    buildCDNUrl, COOKIE,
    DEFAULT_COLOR,
    DISCORD_LINK, EMERALD, serializeList,
    VK,
    VK_PUBLIC_LINK,
    YOUTUBE,
    YOUTUBE_CHANNEL_LINK
} from '../../../utils';
import {
    countMembers,
    countProbationMembers,
    getMembers,
    getProbationMembers
} from '../../../db/index.js';

const { stripIndents } = commonTags;
const { overworld_coordinates, hell_coordinates } = config;

export class Info extends Command {

    constructor() {
        super({
            name: 'info',
            description: 'Узнать больше о СПГ'
        });
    }

    async execute(interaction) {
        const membersCount = await countMembers();
        const probationMembersCount = await countProbationMembers();
        const members = await getMembers();
        const probationMembers = await getProbationMembers();

        const builder = interaction.pagesBuilder()
            .setPages([
                new MessageEmbed()
                    .setTitle('Информация о городе:')
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
                        },
                        {
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
                        },
                        {
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
                            value: serializeList(members),
                            inline: true
                        },
                        {
                            name: 'Испытательный срок:',
                            value: serializeList(probationMembers),
                            inline: true
                        }
                    ])
                    .setFooter('Узнать больше о жителе: /member nickname'),
            ])
            .setComponents(
                new MessageActionRow()
                    .setComponents([
                        new MessageButton()
                            .setCustomId('Information')
                            .setStyle('SECONDARY')
                            .setLabel('Информация')
                            .setEmoji(COOKIE),
                        new MessageButton()
                            .setCustomId('Links')
                            .setStyle('SECONDARY')
                            .setLabel('Полезные ссылки')
                            .setEmoji(EMERALD),
                        new MessageButton()
                            .setCustomId('People')
                            .setLabel('Список жителей')
                            .setStyle('SECONDARY')
                            .setEmoji(BOOKNQUILL),
                    ])
            )
            .setTriggers([
                {
                    name: 'Information',
                    callback: () => {
                        builder.setPage(1);
                    }
                },
                {
                    name: 'Links',
                    callback: () => {
                        builder.setPage(2);
                    }
                },
                {
                    name: 'People',
                    callback: () => {
                        builder.setPage(3);
                    }
                }
            ])
            .setColor(DEFAULT_COLOR)
            .setListenEndColor(DEFAULT_COLOR)
            .setThumbnail(
                buildCDNUrl('icons', interaction.guildId, interaction.guild.icon)
            )
            .setDefaultButtons([])
            .setListenEndMethod('none')
            .setPaginationFormat('');

        builder.build();
    }
}