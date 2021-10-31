import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { JWTokenProvider } from '@modules/users/providers/TokenProvider/implementations/JWTokenProvider';
import { ITokenProvider } from '@modules/users/providers/TokenProvider/models/ITokenProvider';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { container } from 'tsyringe';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTokenProvider);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
