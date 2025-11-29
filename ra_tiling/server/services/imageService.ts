import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

/**
 * 
 * @param inputPath - String file path for an image
 * @param outputBaseName - String name of the image without it's file type i.e. carImg.png = carImg
 */
export async function createResponsiveImages(inputPath : string, outputDir : string, outputBaseName : string) {
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
            .toFile(path.join(outputDir, `${outputBaseName}-${name}.webp`))
    );

    await Promise.all(promises);
}

export async function deleteImages(dirPath : string, namePrefixes : string []) {
    console.log('Calling delete images');
    const files = await fs.readdir(dirPath);
    console.log(`Directory ${dirPath}`)
    console.log(`Directory ${dirPath} contents = ${files}`);
    console.log(`File name prefixes ${namePrefixes}`);
    const matchingFiles = files.filter(file =>
        namePrefixes.some(prefix => file.startsWith(prefix))
    );
    await Promise.all(
        matchingFiles.map(file =>
            fs.unlink(path.join(dirPath, file))
        )
    );
}