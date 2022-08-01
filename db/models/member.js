import mongoose from 'mongoose';

import { DEFAULT_COLOR } from '../../utils';
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
        .then(async () => {
            const createMember = new Member({
                vkId: id
            })
            await createMember.save();

            return true;
        });
}

export function getMembers() {
    return Member.find({
        probation: false,
        permission: {
            $gt: 1
        }
    });
}

export function getProbationMembers() {
    return Member.find({
        probation: true,
        permission: {
            $gt: 1
        }
    });
}

export function getAllMembers() {
    return Member.find({
        permission: {
            $gt: 1
        }
    });
}

export function countMembers() {
    return Member.find({
        probation: false,
        permission: {
            $gt: 1
        }
    })
        .count();
}

export function countProbationMembers() {
    return Member.find({
        probation: true,
        permission: {
            $gt: 1
        }
    })
        .count();
}

export function countAllMembers() {
    return Member.find({
        permission: {
            $gt: 1
        }
    })
        .count();
}