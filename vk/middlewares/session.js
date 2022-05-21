import { client, sessionManager } from '../client';

client.updates.on('message_new', sessionManager.middleware);