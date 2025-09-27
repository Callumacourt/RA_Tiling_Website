import { describe, it, expect, vi, beforeEach } from "vitest";
import syncDriveToS3 from "../../services/syncDriveToS3";

vi.mock('../../services/driveService', () => ({
    listFiles: vi.fn().mockResolvedValue([
        {id: '1', name: 'test1.jpg'}
    ]),
    downloadFile: vi.fn(),
    detectDeletions: vi.fn()
}));

vi.mock('../../services/a3Service', () => ({
    lists3Files: vi.fn().mockResolvedValue([
        ['test1-desktop.webp', 'test1-mobile.webp', 'test-1-tablet.webp']
    ]),
    uploadToS3: vi.fn(),
    deleteFromS3: vi.fn()
}));

vi.mock('../../services/imageService', () => ({
    createResponsiveImages: vi.fn(),
    deleteImages: vi.fn()
}));
vi.mock('fs/promises', () => {
    const readdir = vi.fn().mockResolvedValue(['test-1-mobile.webp', 'test1-desktop.webp', 'test-1-tablet.webp']);
    return {
        default: {
            readdir
        },
        readdir
    }
});

import * as driveService from "../../services/driveService";
import * as imageService from "../../services/imageService";
import * as s3Service from "../../services/a3Service";
import fs from "fs/promises";

describe('syncDriveToS3', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        
        // Mock implementations
        driveService.listFiles.mockResolvedValue([
            {id: '1', name: 'test1.jpg'}
        ]);

        driveService.detectDeletions.mockResolvedValue([]);
        s3Service.lists3Files.mockResolvedValue([]);
        fs.readdir.mockResolvedValue(['test1-mobile.webp', 'test1-desktop.webp', 'test1-tablet.webp']);
    });

    it('should call all necessary functions for syncing', async () => {
        await syncDriveToS3();
        expect(driveService.listFiles).toHaveBeenCalled();
        expect(driveService.downloadFile).toHaveBeenCalled();
        expect(driveService.detectDeletions).toHaveBeenCalled();
        expect(imageService.createResponsiveImages).toHaveBeenCalled();
    });

    it('should handle deletions correctly', async () => {
        driveService.detectDeletions.mockResolvedValue(['deleted.jpg']);
        await syncDriveToS3();
        expect(s3Service.deleteFromS3).toHaveBeenCalledWith(['deleted.jpg']);
        expect(s3Service.deleteFromS3).toHaveBeenCalledTimes(1);
    });

    it('should skip already present files', async () => {
        s3Service.lists3Files.mockResolvedValueOnce(['test1-mobile.webp', 'test1-desktop.webp', 'test1-tablet.webp']);
        driveService.listFiles.mockResolvedValueOnce([  
            {id: 1, name: 'test1.jpg'}
        ]);
        await syncDriveToS3();
        expect(s3Service.uploadToS3).not.toHaveBeenCalled(); 
    });
});