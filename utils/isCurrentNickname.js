import axios from 'axios';

export function isCurrentNickname(nickname) {
    return axios.get(`https://api.ashcon.app/mojang/v2/user/${nickname}`)
        .then(({ data }) => {
            return data.hasOwnProperty('username')
            })
        .catch(() => {
            return false
        })
}