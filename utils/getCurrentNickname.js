import axios from 'axios';

export function getCurrentNickname(nickname) {
    return axios.get(`https://api.ashcon.app/mojang/v2/user/${nickname}`)
        .then(({ data: { username } }) => {
            return username
        })
}