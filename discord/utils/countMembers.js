import { countRoleMembers } from './countRoleMembers';
import { config } from '../../config';

const { member_role_id, probation_member_role_id } = config;

export async function countMembers() {
    return Promise.all([
        countRoleMembers(member_role_id),
        countRoleMembers(probation_member_role_id)
    ])
        .then((value) => (
            value.reduce((total, amount) => (
                total + amount
            ))
        ));
}