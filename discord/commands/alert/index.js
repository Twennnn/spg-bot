import commonTags from 'common-tags';
import { MessageActionRow, MessageButton , MessageEmbed, MessageSelectMenu } from 'discord.js';
import { bold, roleMention } from '@discordjs/builders';
import { PagesBuilder } from 'discord.js-pages';

import { Command } from '../command';
import {
    buildCDNUrl,
    DEFAULT_COLOR,
    MEETING_CHANNEL_ID,
    MEMBERS_ROLE_ID,
    PROBATION_MEMBERS_ROLE_ID,
    VK_CHAT_ID
} from '../../../utils';
import { client } from '../../../vk';
import { getRandomId } from 'vk-io';

const { stripIndents } = commonTags;

const roles = [
    {
        label: 'Жители',
        value: 'members',
        id: MEMBERS_ROLE_ID
    },
    {
        label: 'Испытательный срок',
        value: 'probation_members',
        id: PROBATION_MEMBERS_ROLE_ID
    },
    {
        label: 'Беседа ВК',
        value: 'vk'
    }
];

export class Alert extends Command {

    constructor() {
        super({
            name: 'alert',
            description: 'Отправить объявление о собрании',
            options: [
                {
                    type: 'STRING',
                    name: 'message',
                    description: 'Сообщение, которое будет отправлено',
                    required: true
                }
            ]
        });

        this.selected = [];
    }

    async execute(interaction) {

        if (interaction.channelId !== MEETING_CHANNEL_ID) {
            return;
        }

        const { value: message } = interaction.options.get('message', true);

        this.message = message;

        const generateOptions = () => (
            roles.map(({ label, value }) => ({
                label,
                value,
                default: this.selected.includes(value)
            }))
        );

        const sendListButton = new MessageButton()
            .setCustomId('send')
            .setLabel('Отправить')
            .setStyle('PRIMARY');

        const builder = new PagesBuilder(interaction)
            .setTitle('Настройки уведомления')
            .setDefaultButtons([])
            .setThumbnail(
                buildCDNUrl('icons', interaction.guildId, interaction.guild.icon)
            )
            .setColor(DEFAULT_COLOR)
            .setListenEndColor(DEFAULT_COLOR)
            .setPaginationFormat('');

        builder.setPages([
            () => {
                sendListButton.setDisabled(!this.selected.length);

                builder.setComponents([
                    new MessageActionRow()
                        .setComponents(
                            new MessageSelectMenu()
                                .setCustomId('roles')
                                .setPlaceholder('Выберите кого упомянуть')
                                .setOptions(
                                    generateOptions()
                                )
                                .setMaxValues(roles.length)
                        ),
                    new MessageActionRow()
                        .setComponents(sendListButton)
                ]);

                const selectedItems = this.selected.map((value) => (
                    this.find(value)
                        .label
                ))
                    .join(', ');

                return new MessageEmbed()
                    .setDescription(stripIndents`
                        ${bold('Сообщение:')} ${message}
                        
                        ${bold('Кто будет упомянут:')} ${selectedItems}
                        `);
            }
        ])
            .setTriggers([
                {
                    name: 'roles',
                    callback: ({ values }) =>  {
                        this.selected = values;

                        builder.rerender();
                    }
                },
                {
                    name: 'send',
                    callback: this.send.bind(this)
                }
            ]);

        builder.build();
    }

    send(interaction) {
        if (this.selected.includes('vk')) {
            client.api.messages.send({
                message: stripIndents`
                ${this.message} @all
                `,
                chat_id: VK_CHAT_ID,
                random_id: getRandomId()
            });
        }

        const mentions = this.selected
            .reduce((mentions, selectedValue) => {
                const { id } = this.find(selectedValue);

                if (id) {
                    mentions.push(
                        roleMention(id)
                    );
                }

                return mentions;
            }, [])
            .join(' ');

        if (mentions) {
            interaction.channel.send(stripIndents`
            ${this.message} 
                        
            ${mentions}
            `);
        }

        interaction.deleteReply();
    }

    find(item) {
        const index = roles.findIndex(({ value }) => value === item);

        return roles[index];
    }
}