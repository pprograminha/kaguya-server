import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { PrismaBlocksRepository } from '@modules/blocks/infra/prisma/PrismaBlocksRepository';
import { PrismaUserBlocksRepository } from '@modules/blocks/infra/prisma/PrismaUserBlocksRepository';
import { IClassesRepository } from '@modules/classes/domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { PrismaClassesRepository } from '@modules/classes/infra/prisma/PrismaClassesRepository';
import { PrismaUserClassesRepository } from '@modules/classes/infra/prisma/PrismaUserClassesRepository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { PrismaPlaylistsRepository } from '@modules/playlists/infra/prisma/PrismaPlaylistsRepository';
import { PrismaUserPlaylistsRepository } from '@modules/playlists/infra/prisma/PrismaUserPlaylistsRepository';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { PrismaRolesRepository } from '@modules/roles/infra/prisma/repositories/PrismaRolesRepository';
import { PrismaUserRolesRepository } from '@modules/roles/infra/prisma/repositories/PrismaUserRolesRepository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { PrismaTrailsRepository } from '@modules/trails/infra/prisma/PrismaTrailsRepository';
import { PrismaUserTrailsRepository } from '@modules/trails/infra/prisma/PrismaUserTrailsRepository';
import { IUserRolesRepository } from '@modules/users/domain/repositories/IUserRolesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { PrismaUsersRepository } from '@modules/users/infra/prisma/PrismaUsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IPlaylistsRepository>(
  'PlaylistsRepository',
  PrismaPlaylistsRepository,
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
  PrismaUserRolesRepository,
);

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  PrismaRolesRepository,
);

container.registerSingleton<ITrailsRepository>(
  'TrailsRepository',
  PrismaTrailsRepository,
);

container.registerSingleton<IUserTrailsRepository>(
  'UserTrailsRepository',
  PrismaUserTrailsRepository,
);

container.registerSingleton<IUserPlaylistsRepository>(
  'UserPlaylistsRepository',
  PrismaUserPlaylistsRepository,
);

container.registerSingleton<IUserClassesRepository>(
  'UserClassesRepository',
  PrismaUserClassesRepository,
);

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  PrismaClassesRepository,
);
