import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as a3Service from '../../services/a3Service';

vi.mock('../../services/a3Service.js', async () => {
  const original = await vi.importActual('../../services/a3Service.js');
  return {
    ...original,
    uploadToS3: vi.fn(),
    deleteFromS3: vi.fn(),
  };
});

describe('uploadToS3', () => {
  beforeEach(() => {
    a3Service.uploadToS3.mockReset();
  });

  it('should call upload to s3 with the correct arguments', async () => {
    a3Service.uploadToS3.mockResolvedValueOnce(undefined);

    await a3Service.uploadToS3('mock-path', 'mock-key');

    expect(a3Service.uploadToS3).toHaveBeenCalledOnce();
    expect(a3Service.uploadToS3).toHaveBeenCalledWith('mock-path', 'mock-key');
  });
});

describe('listS3Files', () => {
  beforeEach(() => {
    vi.restoreAllMocks(); 
  });

  it('should return file keys from the bucket', async () => {
    vi.spyOn(a3Service.s3, 'send').mockResolvedValueOnce({
      Contents: [{ Key: 'file1.txt' }, { Key: 'file2.txt' }],
    });

    const result = await a3Service.lists3Files();
    expect(result).toEqual(['file1.txt', 'file2.txt']);
  });

  it('should return an empty array if the bucket is empty', async () => {
    vi.spyOn(a3Service.s3, 'send').mockResolvedValueOnce({
      Contents: [],
    });

    const result = await a3Service.lists3Files();
    expect(result).toEqual([]);
  });
});

describe('deleteFromS3', () => {
  beforeEach(() => {
    a3Service.deleteFromS3.mockReset();
  });

  it('should call delete files with the correct arguments', async () => {
    a3Service.deleteFromS3.mockResolvedValueOnce(undefined);

    await a3Service.deleteFromS3(['file1.txt', 'file2.txt']);

    expect(a3Service.deleteFromS3).toHaveBeenCalledOnce();
    expect(a3Service.deleteFromS3).toHaveBeenCalledWith(['file1.txt', 'file2.txt']);
  });
});
