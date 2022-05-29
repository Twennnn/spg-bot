import { Blacklist, Member } from '../db';

export async function valueInBase(key, value, data = 'member') {
    switch (data) {
        case 'member':
            const inMemberBase = await Member.findOne({ [key]: value })

            return inMemberBase !== null;

        case 'blacklist':
            const inBlacklistBase = await Blacklist.findOne({ [key]: value })

            return inBlacklistBase !== null;
    }
}