import { client } from '../client';

import { Hello } from './hello';
import { Info } from './info';
import { Member } from './member';
import { Alert } from './alert';

const commands =
    [
        Hello,
        Info,
        Member,
        Alert
    ];

const applicationCommands = commands.map((Command) => {
   const command = new Command()
       .command;
   const { name } = command;

   client.commands.set(name, (interaction) => {
       const command = new Command();

       command.execute(interaction);
   });

   return command;
});

client.application.commands.set(applicationCommands);