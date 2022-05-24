import { client } from '../client';
import { COUNT_MEMBER_DISCORD_CHANNEL_ID, DISCORD_ID } from '../../utils';
import { countMembers } from '../utils';

client.on('ready', () => {
    const guild = client.guilds.cache.get(DISCORD_ID)
    setInterval(async () => {
        const channel = guild.channels.cache.get(COUNT_MEMBER_DISCORD_CHANNEL_ID)
        await channel.setName(`Жителей в городе: ${await countMembers()}`)
    }, 5 * 60 * 1_000);
})