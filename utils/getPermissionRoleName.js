export function getPermissionRoleName(value) {
    switch (value) {
        case 1:
            return '🎩 Пользователь'

        case 3:
            return '👩‍🌾 Житель'

        case  5:
            return '⚔ Модератор'

        case 10:
            return '⚙ Администратор'
    }
}