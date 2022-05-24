import { client } from '../client';
import { DISCORD_ID } from '../../utils';

export async function countRoleMembers(roleId) {
    const guild = client.guilds.cache.get(DISCORD_ID);
    await guild.members.fetch();
    const { size } = await guild.roles.cache.get(roleId)
        .members;
    return size;
}