import path from 'path';
import fs from 'fs';
import { storageConfig } from '@config/storage';
import { IStorageProvider } from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(storageConfig.paths.tmpFolder, filename),
      path.resolve(storageConfig.paths.uploadsFolder, filename),
    );

    return filename;
  }

  async deleteFile(filename: string): Promise<null> {
    const filePath = path.resolve(storageConfig.paths.uploadsFolder, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return null;
    }

    await fs.promises.unlink(filePath);

    return null;
  }
}

export { DiskStorageProvider };
