import { MessageContext } from 'vk-io';

export class Command {

    constructor(name, permission = 1) {
        this.name = name;
        this.permission = permission;
    }

    /**
     * Вызов команды
     *
     * @param {MessageContext} context - Контекст сообщения
     */
    execute(context) {}
}