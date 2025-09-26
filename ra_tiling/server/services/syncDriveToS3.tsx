import { listFiles, downloadFile, detectDeletions } from "./driveService.tsx";
import { createResponsiveImages, deleteImages } from "./imageService.tsx";
import { uploadToS3, deleteFromS3, lists3Files } from "./a3Service.tsx";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const downloadsDir = path.resolve(__dirname, "../downloads");
const optimisedDir = path.resolve(__dirname, "../optimised");

interface DriveFile {
    id: string;
    name: string;
}


function normaliseFileName(fileName: string) {
    const base = String(fileName).replace(/\.[^/.]+$/, "");
    return base.replace(/-(mobile|tablet|desktop)$/, "");
}

/**
 * Checks if any new files are present in the drive and downloads them if so
 * @param {*} files - An array of drive file names
 * @param {*} normalizedS3Files - Set of S3 file names with their file type and viewport type removed
 */
const handleDownloads = async (files: DriveFile[], normalizedS3Files: Set<string>) => {
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        // Skip already downloaded files
        if (normalizedS3Files.has(normalisedName)) {
            console.log('Already present in s3, skipping', file.name);
            continue;
        }

        const filePath = path.join(downloadsDir, file.name);
        console.log("Attempting to save:", filePath);
        try {
            await downloadFile(file.id, filePath);
        } catch (err) {
            console.error("Download failed for", file.name, err);
        }
        console.log('successful');
    }
}

/**
 * Handles deleting from S3 bucket when a file is deleted from the drive
 * @param deletions - Array of files to delete
 */
const handleDeletions = async (deletions: string[]) => {
    await deleteFromS3(deletions);
    await deleteImages(optimisedDir, deletions); // In case it persists locally for some reason
    await deleteImages(downloadsDir, deletions);
}

/**
 * Creates responsive webp images from inputted drive folder images
*/
const handleResponsive = async (files: DriveFile[], normalizedS3Files: Set<string>) => {
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        if (normalizedS3Files.has(normalisedName)) {
            console.log('Already present in s3, skipping responsive creation', file.name);
            continue;
        }
        const filePath = path.join(downloadsDir, file.name);
        if (fs.existsSync(filePath)) {
            continue;
        }
        await createResponsiveImages(filePath, optimisedDir, normalisedName);
    }
}

/**
 * Uploads responsive images to the S3 bucket
 * @param finalImages -Images that have been put through handleResponsive and are in ./optimised
 */
const handleUploads = async (finalImages : string[] , normalizedS3Files: Set<string>) => {
    for (const imageName of finalImages) {
        const normalizedImageName = normaliseFileName(imageName);
        if (normalizedS3Files.has(normalizedImageName)) {
            continue;
        }

        const imagePath = path.join(optimisedDir, imageName);
        await uploadToS3(imagePath, imageName);

        // Delete from the optimised folder once uploaded
        await deleteImages(downloadsDir, [imageName]);
        await deleteImages(optimisedDir, [imageName]);
    }
}

/**
 * Orchestrator script that syncs the current state of the drive folder to the S3 Bucket
 * which serves images to the frontend
 */
export default async function syncDriveToS3() {
    const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
    const s3Files = await lists3Files();
    const deletions = await detectDeletions(s3Files, files);
    const normalizedS3Files = new Set <string>();
    s3Files.forEach((s3File) => normalizedS3Files.add(normaliseFileName(s3File)))

    if (deletions && deletions.length > 0) {
       handleDeletions(deletions);
    }

    await handleDownloads(files, normalizedS3Files);
    await handleResponsive(files, normalizedS3Files);
    const finalImages = await fsp.readdir(optimisedDir);
    await handleUploads(finalImages, normalizedS3Files);
};