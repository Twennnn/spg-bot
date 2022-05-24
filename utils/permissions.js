export const Permission = {
    USER: 1,
    MEMBER: 3,
    MODERATOR: 5,
    ADMIN: 10
}

const { USER, MEMBER, MODERATOR, ADMIN } = Permission;

export const permissions = new Map([
    [USER, '🎩 Пользователь'],
    [MEMBER, '👩‍🌾 Житель'],
    [MODERATOR, '⚔ Модератор'],
    [ADMIN, '⚙ Администратор']
])