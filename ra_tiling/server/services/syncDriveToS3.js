import { listFiles, downloadFile, detectDeletions } from "./driveService.js";
import { createResponsiveImages, deleteImages } from "./imageService.js";
import { uploadToS3, deleteFromS3, lists3Files } from "./a3Service.js";
import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute path for downloads
const downloadsDir = path.resolve(__dirname, "../downloads");
const optimisedDir = path.resolve(__dirname, "../optimised");

function normaliseFileName(fileName) {
    const base = String(fileName).replace(/\.[^/.]+$/, "");
    return base.replace(/-(mobile|tablet|desktop)$/, "");
}

/**
 * Checks if any new files are present in the drive and downloads them if so
 * @param {*} files - An array of drive file names
 * @param {*} normalizedS3Files - An array of S3 file names with their file type and viewport type removed
 */
const handleDownloads = async (files, normalizedS3Files) => {
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        // Skip already downloaded files
        if (normalizedS3Files.includes(normalisedName)) {
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

const handleDeletions = async (deletions) => {
    await deleteFromS3(deletions);
    await deleteImages(optimisedDir, deletions);
    await deleteImages(downloadsDir, deletions);
}

const handleResponsive = async (files, normalizedS3Files) => {
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        if (normalizedS3Files.includes(normalisedName)) {
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

const handleUploads = async (finalImages, normalizedS3Files) => {
    for (const imageName of finalImages) {
        const normalizedImageName = normaliseFileName(imageName);
        if (normalizedS3Files.includes(normalizedImageName)) {
            continue;
        }

        const imagePath = path.join(optimisedDir, imageName);
        await uploadToS3(imagePath, imageName);

        // Delete from the optimised folder once uploaded
        await deleteImages(downloadsDir, imageName);
        await deleteImages(optimisedDir, imageName);
    }
}

/**
 * Script that syncs the current state of the drive folder to the S3 Bucket
 * which serves images to the frontend
 */
export default async function syncDriveToS3() {
    const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
    const s3Files = await lists3Files();
    const deletions = await detectDeletions(s3Files, files);
    const normalizedS3Files = s3Files.map(normaliseFileName);

    if (deletions && deletions.length > 0) {
       handleDeletions(deletions);
    }

    await handleDownloads(files, normalizedS3Files);
    await handleResponsive(files, normalizedS3Files);
    const finalImages = await fsp.readdir(optimisedDir);
    await handleUploads(finalImages, normalizedS3Files);
};

syncDriveToS3();
