import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs"; 
import { fileURLToPath } from "url";
import path from "path"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // loads server/.env

/**
 * AWS bucket credentials
 */
const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  }
});


/**
 * 
 * @param {*} localPath - String path to the image
 * @param {*} key - String key value used as name in the bucket
 */
export default async function uploadToS3(localPath, key) {
  const fileStream = fs.createReadStream(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: "ra-tiling-bucket",
    Key: key,
    Body: fileStream,
  }));
  console.log(`Uploaded: https://<your-cloudfront-id>.cloudfront.net/${key}`);
}
