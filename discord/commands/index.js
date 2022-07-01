import { client } from '../client';

import { Help } from './help/index.js';
import { Link } from './link/index.js';
import { Info } from './info';
import { Member } from './member';
import { Alert } from './alert';
import { Blacklist } from './blacklist/index.js';

const commands =
    [
        Help,

        Link,

        Info,

        Member,

        Alert,

        Blacklist
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