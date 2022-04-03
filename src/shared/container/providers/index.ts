import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/bcrypt-hash-provider';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/ihash-provider';
import { JWTokenProvider } from '@modules/users/providers/TokenProvider/implementations/jwt-token-provider';
import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/itoken-provider';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
