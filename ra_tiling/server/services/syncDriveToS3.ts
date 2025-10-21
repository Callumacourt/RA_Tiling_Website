import { listFiles, downloadFile, detectDeletions } from "./driveService.ts";
import { createResponsiveImages, deleteImages } from "./imageService.ts";
import { uploadToS3, deleteFromS3, lists3Files } from "./a3Service.ts";
import {invalidateGalleryCache} from "../controllers/fetchGalleryController.ts";
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

const handleDownloads = async (files: DriveFile[], normalizedS3Files: Set<string>) => {
    console.log("[handleDownloads] files:", files);
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        if (normalizedS3Files.has(normalisedName)) {
            console.log('[handleDownloads] Already present in s3, skipping', file.name);
            continue;
        }

        const filePath = path.join(downloadsDir, file.name);
        console.log("[handleDownloads] Attempting to save:", filePath);
        try {
            await downloadFile(file.id, filePath);
            console.log('[handleDownloads] Download successful:', file.name);
        } catch (err) {
            console.error("[handleDownloads] Download failed for", file.name, err);
        }
    }
}

const handleDeletions = async (deletions: string[]) => {
    console.log("[handleDeletions] Deletions:", deletions);
    await deleteFromS3(deletions);
    await deleteImages(optimisedDir, deletions);
    await deleteImages(downloadsDir, deletions);
}

const handleResponsive = async (files: DriveFile[], normalizedS3Files: Set<string>) => {
    console.log("[handleResponsive] files:", files);
    for (const file of files) {
        const normalisedName = normaliseFileName(file.name);
        if (normalizedS3Files.has(normalisedName)) {
            console.log('[handleResponsive] Already present in s3, skipping responsive creation', file.name);
            continue;
        }
        const filePath = path.join(downloadsDir, file.name);
        console.log('[handleResponsive] Creating responsive images for:', filePath);
        await createResponsiveImages(filePath, optimisedDir, normalisedName);
    }
}

const handleUploads = async (finalImages : string[] , normalizedS3Files: Set<string>) => {
    console.log("[handleUploads] finalImages:", finalImages);
    for (const imageName of finalImages) {
        const normalizedImageName = normaliseFileName(imageName);
        if (normalizedS3Files.has(normalizedImageName)) {
            console.log('[handleUploads] Already present in s3, skipping upload:', imageName);
            continue;
        }

        const imagePath = path.join(optimisedDir, imageName);
        console.log('[handleUploads] Uploading to S3:', imagePath, 'as', imageName);
        await uploadToS3(imagePath, imageName);

        // Delete from the optimised folder once uploaded
        await deleteImages(downloadsDir, [imageName]);
        await deleteImages(optimisedDir, [imageName]);
        console.log('[handleUploads] Deleted local copies of:', imageName);
    }
}

// 
export default async function syncDriveToS3(optimisedDirectory : string = optimisedDir) {
    const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
    const s3Files = await lists3Files();

    const deletions = await detectDeletions(s3Files, files);

    const normalizedS3Files = new Set<string>();
    s3Files.forEach((s3File) => normalizedS3Files.add(normaliseFileName(s3File)));

    if (deletions && deletions.length > 0) {
        await handleDeletions(deletions);
    }

    await handleDownloads(files, normalizedS3Files);
    await handleResponsive(files, normalizedS3Files);

    const finalImages = await fsp.readdir(optimisedDirectory);

    await handleUploads(finalImages, normalizedS3Files);

    invalidateGalleryCache();
    
    console.log("[syncDriveToS3] Sync complete.");
};

syncDriveToS3(optimisedDir);