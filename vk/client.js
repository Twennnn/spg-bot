import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';

export const client = new VK({
    token: process.env.VK_TOKEN
});

export const hearManager = new HearManager();