import mongoose from 'mongoose';

const blacklistSchema = mongoose.Schema({
    nickname: String,
    reason: String,
},{
    versionKey: false
});
export const Blacklist = mongoose.model('Blacklist', blacklistSchema, 'blacklist');

export function getBlacklist() {
    return Blacklist.find()
}