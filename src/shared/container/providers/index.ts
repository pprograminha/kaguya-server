import { BCryptHashProvider } from '@modules/users/providers/hash-provider/implementations/bcrypt-hash-provider';
import { IHashProvider } from '@modules/users/providers/hash-provider/models/hash-provider';
import { JWTokenProvider } from '@modules/users/providers/token-provider/implementations/jwt-token-provider';
import { ITokenProvider } from '@modules/users/providers/token-provider/models/token-provider';
import { DiskStorageProvider } from '@shared/providers/storage-provider/implementations/disk-storage-provider';
import { IStorageProvider } from '@shared/providers/storage-provider/models/storage-provider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
