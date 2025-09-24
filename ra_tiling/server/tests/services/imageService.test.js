import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createResponsiveImages, deleteImages } from '../../services/imageService';
import fs from 'fs';
import path from 'path';

const testImg = path.join(__dirname, '/testData', 'testImg.png' )
const baseName = path.parse(testImg).name;

describe('imageService', () => {
    it ('should successfully create responsive images from input image', async () => {
        const testFolder = path.join(__dirname, 'testWrite');
        await createResponsiveImages(testImg, testFolder, baseName)

        const files = fs.readdirSync(testFolder);
        const expectedFiles = ['testImg-mobile.webp', 'testImg-desktop.webp', 'testImg-tablet.webp'];
        
        expectedFiles.forEach((file) => {
            expect(files).toContain(file)
        });

        // Delete files after testing
        files.forEach((file) => fs.unlinkSync(path.join(testFolder, file)));
    })

    it('should successfully delete all responsive variations of a given image', async () => {
        const testFolder = path.join(__dirname, 'testWrite');
        await createResponsiveImages(testImg, testFolder, baseName);

        let files = fs.readdirSync(testFolder);
        expect(files.length).toEqual(3); // mobile, tablet, desktop
        deleteImages(testFolder, ['testImg']);

        files = fs.readdirSync(testFolder)
        expect(files.length).toEqual(0)
    })
})