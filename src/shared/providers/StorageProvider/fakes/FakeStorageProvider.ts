import { IStorageProvider } from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  async saveFile(filename: string): Promise<string> {
    return filename;
  }

  async deleteFile(): Promise<null> {
    return null;
  }
}

export { FakeStorageProvider };
