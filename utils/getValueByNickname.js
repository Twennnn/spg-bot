import { getCurrentNickname } from './getCurrentNickname';
import { Member } from '../db';

export async function getValueByNickname(nickname, key) {
    const member = await Member.findOne({ nickname: await getCurrentNickname(nickname) })
    return member.get(`${key}`)
}