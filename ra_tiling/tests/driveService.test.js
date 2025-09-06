import { describe, it, expect, vi } from 'vitest';
import {mockList} from '../server/config/drive'
import { listFiles } from '../server/services/driveService';

vi.mock('../server/config/drive', () => {
    const mockList = vi.fn().mockResolvedValue({ data: { files: [] } }); 
    return {
        drive: { files: { list: mockList } },
        __esModule: true,
        mockList 
    };
});

describe('listFiles', () => {
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
        await expect(listFiles('mock-id')).rejects.toThrow('Drive API failed');
    })

    it('rejects files without mimetype', async () => {
        mockList.mockResolvedValueOnce({
            data: { files : [{id: 'img1'}, {id: 'img2', name: 'image2'}]}
        })
        const files = await listFiles('mock-id')
        expect(files).toEqual([]);
    })
});