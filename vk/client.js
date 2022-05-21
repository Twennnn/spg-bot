import { VK } from 'vk-io';
import { HearManager } from '@vk-io/hear';
import { SessionManager } from '@vk-io/session';
import { SceneManager } from '@vk-io/scenes';

export const client = new VK({
    token: process.env.VK_TOKEN
});

export const hearManager = new HearManager();
export const sessionManager = new SessionManager();
export const sceneManager = new SceneManager();