import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { PrismaBlocksRepository } from '@modules/blocks/infra/prisma/PrismaBlocksRepository';
import { PrismaUserBlocksRepository } from '@modules/blocks/infra/prisma/PrismaUserBlocksRepository';
import { BlocksRepository } from '@modules/blocks/infra/typeorm/repositories/BlocksRepository';
import { UserBlocksRepository } from '@modules/blocks/infra/typeorm/repositories/UserBlocksRepository';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { ClassesRepository } from '@modules/classes/infra/typeorm/repositories/ClassesRepository';
import { UserClassesRepository } from '@modules/classes/infra/typeorm/repositories/UserClassesRepository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { PlaylistsRepository } from '@modules/playlists/infra/typeorm/repositories/PlaylistsRepository';
import { UserPlaylistsRepository } from '@modules/playlists/infra/typeorm/repositories/UserPlaylistsRepository';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { RolesRepository } from '@modules/roles/infra/typeorm/repositories/RolesRepository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { TrailsRepository } from '@modules/trails/infra/typeorm/repositories/TrailsRepository';
import { UserTrailsRepository } from '@modules/trails/infra/typeorm/repositories/UserTrailsRepository';
import { IUserRolesRepository } from '@modules/users/domain/repositories/IUserRolesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { PrismaUsersRepository } from '@modules/users/infra/prisma/PrismaUsersRepository';
import { UserRolesRepository } from '@modules/users/infra/typeorm/repositories/UserRolesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IPlaylistsRepository>(
  'PlaylistsRepository',
  PlaylistsRepository,
);

container.registerSingleton<IBlocksRepository>(
  'BlocksRepository',
  PrismaBlocksRepository,
);

container.registerSingleton<IUserBlocksRepository>(
  'UserBlocksRepository',
  PrismaUserBlocksRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  PrismaUsersRepository,
);

container.registerSingleton<IUserRolesRepository>(
  'UserRolesRepository',
  UserRolesRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<ITrailsRepository>(
  'TrailsRepository',
  TrailsRepository,
);

container.registerSingleton<IUserTrailsRepository>(
  'UserTrailsRepository',
  UserTrailsRepository,
);

container.registerSingleton<IUserPlaylistsRepository>(
  'UserPlaylistsRepository',
  UserPlaylistsRepository,
);

container.registerSingleton<IUserClassesRepository>(
  'UserClassesRepository',
  UserClassesRepository,
);

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  ClassesRepository,
);
