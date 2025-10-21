import { drive } from "../config/drive.js";
import { createWriteStream } from "fs";

interface DriveFile {
    id: string,
    name : string,
    mimeType: string,
}

/**
 * 
 * @param {*} folderId  - String id value for a Google Drive folder
 * @returns - An array of file objects with id, name and mimeType vaues
 */
export async function listFiles(folderId : string) : Promise <DriveFile[]> {
    try {
        const res = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType)",
        });

        const files = res.data.files;
        if (files === undefined) {
            return [];
        }
        
    // Assert that incoming files have name, string and mimeType then return them
    return files
      .filter(
        (file): file is { id: string; name: string; mimeType: string } =>
          !!file.id && !!file.name && !!file.mimeType && file.mimeType.startsWith("image/")
      )
      .map(file => ({
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
      }));

    } catch (error) {
        console.error(`Error listing files for folder ${folderId}:`, error);
        throw new Error(`Failed to list files for folder ${folderId}`);
    }
}


/**
 * 
 * @param {*} s3Files - An array of file name keys from the S3 bucket i.e. thumbnail-desktop.png
 * @param {*} driveFiles - An array of file objects with id, name and mimeType vaues
 * @returns - An array of missing file keys
 */
export async function detectDeletions(s3Files : string [], driveFiles : DriveFile []) :  Promise <string[]>{
    const missingFiles: string [] = [];

    const driveNames = driveFiles.map(f => f.name.replace(/\.[^/.]+$/, "")); // Remove extension

    for (const key of s3Files) {
        // Remove suffix (-mobile, -tablet, -desktop) and extension
        const baseName = key.replace(/-(mobile|tablet|desktop)\.webp$/, "")
                            .replace(/\.[^/.]+$/, "");
        const found = driveNames.includes(baseName);
        console.log(`Checking S3 key: ${key} (base: ${baseName}) -- Found in Drive: ${found}`);
        if (!found) {
            missingFiles.push(key);
        }
    }
    return missingFiles;
}

/**
 * 
 * @param {*} fileId - String value for a files ID
 * @param {*} destPath - String of the desired output folder path for the downloaded image
 * @returns - Promise that if resolved writes the file to given destPath
 */
export async function downloadFile(fileId : string, destPath : string) : Promise<void> {
    try {
        const res = await drive.files.get(
            { fileId, alt: "media" },
            { responseType: 'stream' }
        );
        return new Promise<void>((resolve, reject) => {
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