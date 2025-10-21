import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import fs from "fs"; 
import { fileURLToPath } from "url";
import path from "path"; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") }); // loads server/.env

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_KEY) throw new Error ('Missing AWS .env variables')

/**
 * AWS bucket credentials
 */
export const s3 = new S3Client({
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
export async function uploadToS3(localPath : string, key : string) {
  const fileStream = fs.createReadStream(localPath);
  await s3.send(new PutObjectCommand({
    Bucket: "ra-tiling-bucket",
    Key: key,
    Body: fileStream,
  }));
  console.log(`Uploaded:${key}`);
}

/**
 * Gets files from the s3 bucket
 * @returns An array of file key names from the S3 bucket
 */
export async function lists3Files() : Promise <string[]> {
  const command  = new ListObjectsV2Command({
    Bucket: "ra-tiling-bucket"
  })
  const response = await s3.send(command);
  // Map array of file objects to just their keys
  console.log(`default response ${Object.entries(response)}`)
  // Ensure key is of type string
  return response.Contents?.map(obj => obj.Key).filter((key) :  key is string => !!key) || [];
};

/**
 * Deletes files associated with the input keys from the S3 bucket
 * @param {*} keys - An array of file key names from the S3 bucket
 */
export async function deleteFromS3(keys : string[]) {
  console.log(`Keys to delete ${keys}`)
 const command = new DeleteObjectsCommand({
  Bucket: "ra-tiling-bucket",
  Delete: {
    Objects: keys.map(key => ({ Key: key }))
  }
 });

 const response = await s3.send(command);
  if (response.Deleted && response.Deleted.length > 0) {
    console.log('Successful deletion:', response.Deleted.map(obj => obj.Key));
  } else {
    console.log('No files deleted or unsuccessful');
  }
}
