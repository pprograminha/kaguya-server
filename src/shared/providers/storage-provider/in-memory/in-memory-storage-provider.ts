import { IStorageProvider } from '../models/storage-provider';

class InMemoryStorageProvider implements IStorageProvider {
  async saveFile(filename: string): Promise<string> {
    return filename;
  }

  async deleteFile(): Promise<void> {}
}

export { InMemoryStorageProvider };
