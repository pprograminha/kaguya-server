import { IBlocksRepository } from '@modules/blocks/domain/repositories/iblocks-repository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/iuser-blocks-repository';
import { PrismaBlocksRepository } from '@modules/blocks/infra/prisma/prisma-blocks-repository';
import { PrismaUserBlocksRepository } from '@modules/blocks/infra/prisma/prisma-user-blocks-repository';
import { IClassesRepository } from '@modules/classes/domain/repositories/iclasses-repository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/iuser-classes-repository';
import { IViewsRepository } from '@modules/classes/domain/repositories/iviews-repository';
import { PrismaClassesRepository } from '@modules/classes/infra/prisma/prisma-classes-repository';
import { PrismaUserClassesRepository } from '@modules/classes/infra/prisma/prisma-user-classes-repository';
import { IHistoriesRepository } from '@modules/histories/domain/repositories/ihistories-repository';
import { PrismaHistoriesRepository } from '@modules/histories/infra/prisma/prisma-histories-repository';
import { IDislikesRepository } from '@modules/likes/domain/repositories/idislikes-repository';
import { ILikesRepository } from '@modules/likes/domain/repositories/ilikes-repository';
import { PrismaDislikesRepository } from '@modules/likes/infra/prisma/prisma-dislikes-repository';
import { PrismaLikesRepository } from '@modules/likes/infra/prisma/prisma-likes-repository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/iplaylists-repository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/iuser-playlists-repository';
import { PrismaPlaylistsRepository } from '@modules/playlists/infra/prisma/prisma-playlists-repository';
import { PrismaUserPlaylistsRepository } from '@modules/playlists/infra/prisma/prisma-user-playlists-repository';
import { IRolesRepository } from '@modules/roles/domain/repositories/IRolesRepository';
import { PrismaRolesRepository } from '@modules/roles/infra/prisma/repositories/PrismaRolesRepository';
import { PrismaUserRolesRepository } from '@modules/roles/infra/prisma/repositories/PrismaUserRolesRepository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { PrismaTrailsRepository } from '@modules/trails/infra/prisma/PrismaTrailsRepository';
import { PrismaUserTrailsRepository } from '@modules/trails/infra/prisma/PrismaUserTrailsRepository';
import { IUserRolesRepository } from '@modules/users/domain/repositories/iuser-roles-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
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

container.registerSingleton<IUserClassesRepository>(
  'UserClassesRepository',
  PrismaUserClassesRepository,
);

container.registerSingleton<IClassesRepository>(
  'ClassesRepository',
  PrismaClassesRepository,
);
