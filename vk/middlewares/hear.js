import { client, hearManager } from '../client';

client.updates.on('message_new', hearManager.middleware);