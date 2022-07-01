import { Member as Memberr } from './../db/models/member.js';

export const countAllMembers = await Memberr.find({ probation: { $exists: true }}).count();