import { drive } from "../config/drive.js";
import { createWriteStream } from "fs";
import sharp from "sharp";

// Lists all image files in the googleDrive folder for the gallery
export async function listFiles(folderId) {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType)",
        });
        return (res.data.files || []).filter(
            file => file.mimeType && file.mimeType.startsWith('image/')
        );
    } catch (error) {
        console.error(`Error listing files for folder ${folderId}:`, error);
        throw new Error(`Failed to list files for folder ${folderId}`);
    }
}

// Download an individual file from the drive
export async function downloadFile(fileId, destPath) {
    try {
        const res = await drive.files.get(
            { fileId, alt: "media" },
            { responseType: 'stream' }
        );
        return new Promise((resolve, reject) => {
            const dest = createWriteStream(destPath);
            res.data
                .on("end", () => resolve())
                .on("error", (err) => {
                    console.error(`Error downloading file ${fileId} to ${destPath}:`, err);
                    reject(new Error(`Failed to download file ${fileId}`));
                })
                .pipe(dest);
        });
    } catch (err) {
        console.error(`Error initiating download for file ${fileId}:`, err);
        throw new Error(`Failed to initiate download for file ${fileId}`);
    }
}


const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
console.log(files);

if (files.length > 0) {
    const fileId = files[0].id;
    await downloadFile(fileId, `../downloads/${files[0].name}`);
}