import axios from 'axios';

export function getCurrentNickname(nickname) {
    if (!nickname) {
        return;
    }
    return axios.get(`https://api.ashcon.app/mojang/v2/user/${nickname}`)
        .then(({ data: { username } }) => {
            return username
        })
        .catch(() => {})
}