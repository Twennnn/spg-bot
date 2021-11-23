import { MessageContext } from 'vk-io';

export class Command {

    constructor(name) {
        this.name = name;
    }

    /**
     * Вызов команды
     *
     * @param {MessageContext} context - Контекст сообщения
     */
    execute(context) {}
}