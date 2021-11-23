import { Client, Collection } from 'discord.js';

export const client = new Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_INTEGRATIONS',
        'GUILD_MEMBERS'
    ]
});

client.commands = new Collection();

client.login(process.env.DISCORD_TOKEN);