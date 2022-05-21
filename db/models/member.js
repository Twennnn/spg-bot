import mongoose from 'mongoose';

import { DEFAULT_COLOR } from '../../utils';


const memberSchema = mongoose.Schema({
    nickname: String,
    vkId: Number,
    discordId: String,
    probation: Boolean,
    color: {
        type: String,
        default: DEFAULT_COLOR
    },
    description: {
        type: String,
        default: '-'
    }
},{
    versionKey: false
});
export const Member = mongoose.model('Member', memberSchema, 'members');