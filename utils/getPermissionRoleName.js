export function getPermissionRoleName(value) {
    if (value === 3) {
        return '👩‍🌾 Житель'
    }
    if (value === 5) {
        return '⚔ Модератор'
    }
    if (value === 10) {
        return '⚙ Администратор'
    } else {
        return '🎩 Пользователь'
    }
}