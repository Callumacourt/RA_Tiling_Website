#!/usr/bin/env node
import { drive } from '../config/drive.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * Registers a Google Drive webhook for a specific folder
 * @param {string} ngrokUrl - The publicly accessible ngrok URL (https://xxx.ngrok-free.app)
 */
export async function watchDriveFolder(ngrokUrl: string) {
    if (!ngrokUrl.startsWith('https://')) {
        throw new Error("ngrokUrl must be HTTPS");
    }

    const channelId = uuidv4(); // generate a new unique channel ID
    try {
        const res = await drive.files.watch({
            fileId: '1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-', 
            requestBody: {
                id: channelId,
                type: 'web_hook',
                address: `${ngrokUrl}/api/drive-webhook`, // will be site url when live
            },
        });

        console.log('Watch successfully registered:', res.data);
        console.log(`Your ngrok URL: ${ngrokUrl}/api/drive-webhook`);
    } catch (err) {
        console.error('Failed to register watch:', err);
    }
}

// CLI execution
if (import.meta.url === `file://${process.argv[1]}`) {
    const ngrokUrl = process.argv[2];
    if (!ngrokUrl) {
        console.error("Usage: node watchdrive.js <NGROK_URL>");
        process.exit(1);
    }

    watchDriveFolder(ngrokUrl).catch(console.error);
}
