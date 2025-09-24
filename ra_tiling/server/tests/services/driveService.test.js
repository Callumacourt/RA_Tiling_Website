import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listFiles } from '../../services/driveService';

vi.mock('../../config/drive', () => {
    const mockList = vi.fn().mockResolvedValue({ data: { files: [] } });
    const mockGet = vi.fn();
    return {
        __esModule: true,
        drive: { files: { list: mockList, get: mockGet } }
    };
});

describe('listFiles', () => {
    let mockList;

    beforeEach(async () => {
        ({ drive: { files: { list: mockList } } } = await import('../../config/drive'));
    });

    it('should list files', async () => {
        mockList.mockResolvedValueOnce({
            data: { files: [{ id: 'img1', name: 'image1.jpg', mimeType: 'image/jpeg' }] }
        });
        const files = await listFiles('mock-id');
        expect(files).toEqual([
            { id: 'img1', name: 'image1.jpg', mimeType: 'image/jpeg' },
        ]);
    });

    it('should handle an empty folder', async () => {
        mockList.mockResolvedValueOnce({
            data: { files: [] }
        })
        const files = await listFiles('mock-id')
        expect(files).toEqual([]);
    })

    it('should handle API error', async () => {
        mockList.mockRejectedValueOnce(new Error('Drive API failed'));
        await expect(listFiles('mock-id')).rejects.toThrow("Failed to list files for folder mock-id");
    })

    it('rejects files without mimetype', async () => {
        mockList.mockResolvedValueOnce({
            data: { files : [{id: 'img1'}, {id: 'img2', name: 'image2'}]}
        })
        const files = await listFiles('mock-id')
        expect(files).toEqual([]);
    })
});

vi.mock('fs', () => {
    const fsMock = {
        createWriteStream: vi.fn(() => ({
            on: vi.fn().mockReturnThis(),
            pipe: vi.fn().mockReturnThis()
        }))
    };
    return {
        ...fsMock,
        default: fsMock 
    };
});

describe('downloadFile', () => {
    let mockGet;

    beforeEach(async () => {
        ({ drive: { files: { get: mockGet } } } = await import('../../config/drive'));
    });

    it('successfully downloads files', async () => {
        const { downloadFile } = await import('../../services/driveService');

        const fakeStream = {
            on: vi.fn((event, cb) => {
                if (event === 'end') cb();
                return fakeStream;
            }),
            pipe: vi.fn().mockReturnThis()
        };

        mockGet.mockResolvedValueOnce({ data: fakeStream });

        await expect(downloadFile('fileId', 'destpath')).resolves.toBeUndefined();
    });
});
