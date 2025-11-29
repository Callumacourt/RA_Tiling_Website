import { lists3Files } from "../services/a3Service";

let cachedImages: string[] = [];
let cacheValid = false;

export async function fetchGalleryController(req: any, res: any) {
    try {
        if (!cacheValid) {
            const s3Files = await lists3Files();
            cachedImages = s3Files.map((key: string) =>
                `https://d22uy8b4bgbpz2.cloudfront.net/${key}`
            );
            cacheValid = true;
        }
        res.json(cachedImages);
    } catch {
        res.status(500).send('Error fetching images');
    }
}

// Export a function to invalidate the cache
export function invalidateGalleryCache() {
    cacheValid = false;
}
