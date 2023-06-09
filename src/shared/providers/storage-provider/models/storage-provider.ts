interface IStorageProvider {
  saveFile(filename: string): Promise<string>;
  deleteFile(filename: string): Promise<void>;
}

export { IStorageProvider };
