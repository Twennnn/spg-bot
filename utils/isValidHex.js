export const colorRegExp = /^[0-9A-Fa-f]{6}$/g

export function isValidHex(color) {
    return Boolean(
        color
            .match(colorRegExp)
    );
}