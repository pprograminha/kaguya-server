import crypto from 'crypto';
import path from 'path';
import { diskStorage, StorageEngine } from 'multer';

interface IStorageConfig {
  driver: 's3' | 'disk';
  multer: {
    storage: StorageEngine;
  };
  paths: {
    tmpFolder: string;
    uploadsFolder: string;
  };
  config: {
    disk: {};
    s3: {};
  };
}
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  multer: {
    storage: diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const hash = crypto.randomBytes(15).toString('hex');
        const filename = `${hash}-${file.originalname.replace(/\s/, '-')}`;

        callback(null, filename);
      },
    }),
  },
  paths: {
    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  },
  config: {
    disk: {},
    s3: {},
  },
} as IStorageConfig;

export { storageConfig };
