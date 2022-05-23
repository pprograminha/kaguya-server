import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { PrismaBlocksRepository } from '@modules/blocks/infra/prisma/prisma-blocks-repository';
import { PrismaUserBlocksRepository } from '@modules/blocks/infra/prisma/prisma-user-blocks-repository';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { IViewsRepository } from '@modules/lessons/domain/repositories/views-repository';
import { PrismaLessonsRepository } from '@modules/lessons/infra/prisma/prisma-lessons-repository';
import { PrismaUserLessonsRepository } from '@modules/lessons/infra/prisma/prisma-user-lessons-repository';
import { IHistoriesRepository } from '@modules/histories/domain/repositories/histories-repository';
import { PrismaHistoriesRepository } from '@modules/histories/infra/prisma/prisma-histories-repository';
import { IDislikesRepository } from '@modules/likes/domain/repositories/dislikes-repository';
import { ILikesRepository } from '@modules/likes/domain/repositories/likes-repository';
import { PrismaDislikesRepository } from '@modules/likes/infra/prisma/prisma-dislikes-repository';
import { PrismaLikesRepository } from '@modules/likes/infra/prisma/prisma-likes-repository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/user-playlists-repository';
import { PrismaPlaylistsRepository } from '@modules/playlists/infra/prisma/prisma-playlists-repository';
import { PrismaUserPlaylistsRepository } from '@modules/playlists/infra/prisma/prisma-user-playlists-repository';
import { IRolesRepository } from '@modules/roles/domain/repositories/roles-repository';
import { PrismaRolesRepository } from '@modules/roles/infra/prisma/repositories/prisma-roles-repository';
import { PrismaUserRolesRepository } from '@modules/roles/infra/prisma/repositories/prisma-user-roles-repository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/user-trails-repository';
import { PrismaTrailsRepository } from '@modules/trails/infra/prisma/prisma-trails-repository';
import { PrismaUserTrailsRepository } from '@modules/trails/infra/prisma/prisma-user-trails-repository';
import { IUserRolesRepository } from '@modules/users/domain/repositories/user-roles-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { PrismaUsersRepository } from '@modules/users/infra/prisma/prisma-users-repository';
import { PrismaViewsRepository } from '@modules/users/infra/prisma/prisma-views-repository';
import { container } from 'tsyringe';

container.registerSingleton<IHistoriesRepository>(
  'HistoriesRepository',
  PrismaHistoriesRepository,
);
container.registerSingleton<IViewsRepository>(
  'ViewsRepository',
  PrismaViewsRepository,
);

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  PrismaLikesRepository,
);

container.registerSingleton<IDislikesRepository>(
  'DislikesRepository',
  PrismaDislikesRepository,
);

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

container.registerSingleton<IUserLessonsRepository>(
  'UserLessonsRepository',
  PrismaUserLessonsRepository,
);

container.registerSingleton<ILessonsRepository>(
  'LessonsRepository',
  PrismaLessonsRepository,
);
