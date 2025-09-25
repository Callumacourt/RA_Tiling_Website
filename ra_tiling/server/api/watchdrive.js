import { drive } from '../config/drive.js';
import { v4 as uuidv4 } from 'uuid';
const channelId = uuidv4();

/**
 * Sets up WebHook with drive folder
 */
export async function watchDriveFolder() {
    const res = await drive.files.watch({
        fileId: '1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-',
        requestBody: {
            id: channelId,
            type: 'web_hook',
            address: 'https://a013403d5644.ngrok-free.app ',
        }
    });
    console.log('Watch response:', res.data);
}

watchDriveFolder().catch(console.error);