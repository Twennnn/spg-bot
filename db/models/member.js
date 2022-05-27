import mongoose from 'mongoose';

import { DEFAULT_COLOR, getCurrentNickname } from '../../utils';
import { client } from '../../vk';

const memberSchema = mongoose.Schema({
    nickname: {
      type: String,
      required: false
    },
    vkId: Number,
    discordId: {
        type: String,
        required: false
    },
    probation: {
        type: Boolean,
        required: false
    },
    color: {
        type: String,
        default: DEFAULT_COLOR
    },
    description: {
        type: String,
        default: '-'
    },
    permission: {
        type: Number,
        default: 1
    }
},{
    versionKey: false
});
export const Member = mongoose.model('Member', memberSchema, 'members');

export function createUser(id) {
    return client.api.users.get({
        user_id: id
    })
        .then(async() => {
            const createMember = new Member({
                vkId: id
            })
            await createMember.save();
        })
}

export async function getValueByNickname(nickname, key) {
    const member = await Member.findOne({ nickname: await getCurrentNickname(nickname) })
    return member.get(`${key}`)
}
