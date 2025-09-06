import { drive } from "../config/drive.js";
// Lists all files in the googleDrive folder for the gallery
async function listFiles(folderId) {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType)",
        });
        return res.data.files;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
console.log(files);

export {};