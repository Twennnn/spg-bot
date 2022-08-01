import { getAllMembers } from '../db/index.js';
import { hyperLink } from '../vk/utils';

export async function getListOfMembersInDB() {
    const array = await getAllMembers()
    return array.map(({ nickname }) => hyperLink(nickname))
        .join(', ');
}