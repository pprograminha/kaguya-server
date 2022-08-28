import { storageConfig } from '@config/storage';
import { AppError } from '@shared/errors/app-error';
import aws, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { IStorageProvider } from '../models/storage-provider';

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const awsDefaultRegion = process.env.AWS_DEFAULT_REGION;
    const awsBucket = process.env.AWS_BUCKET;

    if (!awsAccessKeyId) {
      throw new AppError('Environment variable not defined: AWS_ACCESS_KEY_ID');
    }
    if (!awsSecretAccessKey) {
      throw new AppError(
        'Environment variable not defined: AWS_SECRET_ACCESS_KEY',
      );
    }
    if (!awsDefaultRegion) {
      throw new AppError(
        'Environment variable not defined: AWS_DEFAULT_REGION',
      );
    }
    if (!awsBucket) {
      throw new AppError('Environment variable not defined: AWS_BUCKET');
    }
    this.client = new aws.S3({
      region: awsDefaultRegion,
    });
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(storageConfig.paths.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath);
    /** return: image/png */
    const ContentType = mime.getType(originalPath);

    if (!ContentType) throw new AppError('File not found.');

    await this.client
      .putObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: storageConfig.config.s3.bucket,
        Key: file,
      })
      .promise();
  }
}
