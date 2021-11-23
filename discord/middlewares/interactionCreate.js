import { PagesManager } from 'discord.js-pages';

import { client } from '../client';

const pagesManager = new PagesManager();

client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }

    const command = client.commands.get(interaction.commandName);

    if (!command) {
        return;
    }

    pagesManager.middleware(interaction);

    command(interaction);
});