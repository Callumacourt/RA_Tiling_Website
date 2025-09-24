import { drive } from '../config/drive.js';
import { v4 as uuidv4 } from 'uuid';
const channelId = uuidv4();

export async function watchDriveFolder() {
    const res = await drive.files.watch({
        fileId: '1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-',
        requestBody: {
            id: channelId,
            type: 'web_hook',
            address: 'https://901f0cd9c4dc.ngrok-free.app/api/drive-webhook',
        }
    });
    console.log('Watch response:', res.data);
}

watchDriveFolder().catch(console.error);