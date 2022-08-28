import crypto from 'crypto';
import { diskStorage, StorageEngine, MulterError } from 'multer';
import path from 'path';

export type StorageDrivers = 's3' | 'disk';

type StorageConfig = {
  driver: StorageDrivers;
  multer: {
    storage: StorageEngine;
  };
  paths: {
    tmpFolder: string;
    uploadsFolder: string;
  };
  config: {
    disk: {};
    s3: {
      bucket: string;
    };
  };
};
const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

const storageConfig = {
  driver: process.env.STORAGE_DRIVER || 'disk',
  multer: {
    storage: diskStorage({
      destination: (request, file, callback) => {
        let error: Error | null = null;
        type TMime = 'image/png' | 'image/jpeg' | 'image/jpg';

        const mimeTypes = {
          'image/png': 'png',
          'image/jpeg': 'jpg',
          'image/jpg': 'jpg',
        };

        if (!mimeTypes[file.mimetype as TMime]) {
          error = new MulterError('LIMIT_FIELD_VALUE');
        }

        callback(error, tmpFolder);
      },
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
    s3: {
      bucket: process.env.AWS_BUCKET,
    },
  },
} as StorageConfig;

export { storageConfig };
