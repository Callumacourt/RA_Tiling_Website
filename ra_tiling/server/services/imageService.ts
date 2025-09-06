import sharp from "sharp";

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
            .toFile(`../optimised/${outputBaseName}-${name}.webp`)
    );

    await Promise.all(promises);
}
