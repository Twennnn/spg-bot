import { Member, Blacklist } from './db';

import _config from './config.json' assert { type: 'json' };

export const members = await Member.find();
export const blacklist = await Blacklist.find();

export const config = {
    ..._config,
    members: members.filter(({ probation, permission }) => (
        probation === false && permission > 1
    )),
    probation_members: members.filter(({ probation, permission }) =>  (
        probation === true && permission > 1
    )),
    blacklist: blacklist
};