import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const optimisedDir = path.resolve(__dirname, "../optimised");

/**
 * 
 * @param inputPath - String file path for an image
 * @param outputBaseName - String name of the image without it's file type i.e. carImg.png = carImg
 */
export async function createResponsiveImages(inputPath, outputBaseName) {
    // Define sizes for mobile, tablet, desktop
    const sizes = [
        { name: "mobile", width: 480 },
        { name: "tablet", width: 768 },
        { name: "desktop", width: 1280 }
    ];

    // Resize image to each of these sizes, convert to .webp
    // Then, output to optimised folder 
    const promises = sizes.map(({ name, width }) =>
        sharp(inputPath)
            .resize({ width })
            .webp({ quality: 80 })
            .toFile(path.join(optimisedDir, `${outputBaseName}-${name}.webp`))
    );

    await Promise.all(promises);
}
