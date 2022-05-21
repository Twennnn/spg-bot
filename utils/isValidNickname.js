export const nameRegExp = /^([a-z0-9_]{1,16}|[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}|[0-9a-f]{8}[0-9a-f]{4}[0-5][0-9a-f]{3}[089ab][0-9a-f]{3}[0-9a-f]{12})$/gi;

export function isValidNickname(nickname) {
    return Boolean(
        nickname
            .match(nameRegExp)
    );
}