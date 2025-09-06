import { drive } from "../config/drive.js";

// Lists all image files in the googleDrive folder for the gallery
export async function listFiles(folderId) {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType)",
        });
        // Return empty array if drive is empty, filter drive for only image files
        return (res.data.files || []).filter(
            file => file.mimeType && file.mimeType.startsWith('image/')
        );
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
console.log(files);