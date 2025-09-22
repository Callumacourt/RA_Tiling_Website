import { listFiles, downloadFile, detectDeletions } from "./driveService.js";
import { createResponsiveImages, deleteImages } from "./imageService.js";
import { uploadToS3, deleteFromS3, lists3Files } from "./a3Service.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use absolute path for downloads
const downloadsDir = path.resolve(__dirname, "../downloads");
const optimisedDir = path.resolve(__dirname, "../optimised")

/**
 * Script that syncs the current state of the drive folder to the S3 Bucket
 * which serves images to the frontend
 */
export default async function syncDriveToS3 () {
    const files = await listFiles(`1h9itLF-gu_Bl2zHtBPB_HPy-HhAtW6S-`);
    const s3Files = await lists3Files();

    // Detect deletions in drive, delete in s3 if needed
    const deletions = await detectDeletions(s3Files, files)

    if (deletions.length > 0) { 
        await deleteFromS3(deletions)
        await deleteImages(optimisedDir, deletions);
        await deleteImages(downloadsDir, deletions); 
    }

    // Download all new files
    for (const file of files) {
        // Skip already downloaded files
        if (s3Files.some(s3File => s3File === file.name)) {
            continue
        }
        const filePath = path.join(downloadsDir, file.name);
        await downloadFile(file.id, filePath);
    }

    // Create responsive images from each file
    for (const file of files) {
        const filePath = path.join(downloadsDir, file.name);
        await createResponsiveImages(filePath, file.name.replace(/\.[^/.]+$/, ""));
    }

    const finalImages = await fs.readdir(optimisedDir);

    // Upload responsive images to S3
    for (const imageName of finalImages) {
        if (s3Files.includes(imageName)) {
            continue; // Skip if already in S3
        }
        const imagePath = path.join(optimisedDir, imageName);
        await uploadToS3(imagePath, imageName);
    }
};

syncDriveToS3();