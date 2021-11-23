import Discord, { CommandInteraction } from 'discord.js';

const { ApplicationCommandData } = Discord;

/**
 * Основной класс команды
 */
export class Command {

    /**
     * @param {ApplicationCommandData} command - Описание команды
     */
    constructor(command) {
        this.command = command;
    }

    /**
     * Метод для вызова команды
     *
     * @param {CommandInteraction & IPagesInteraction} interaction - Взаимодействие пользователя
     */
    execute(interaction) {}
}