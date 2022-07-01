import { Member as Memberr } from '../db/index.js';
import { hyperLink } from '../vk/utils';

export async function getListOfMembersInDB() {
    const array = await Memberr.find({ probation: { $exists: true }});
    return array.map(({ nickname }) => hyperLink(nickname))
        .join(', ');
}