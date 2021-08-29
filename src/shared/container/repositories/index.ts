import { IPlatformRolesRepository } from '@modules/platformRoles/domain/repositories/IPlatformRolesRepository';
import { PlatformRolesRepository } from '@modules/platformRoles/infra/typeorm/repositories/PlatformRolesRepository';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { PlaylistsRepository } from '@modules/playlists/infra/typeorm/repositories/PlaylistsRepository';
import { UserPlaylistsRepository } from '@modules/playlists/infra/typeorm/repositories/UserPlaylistsRepository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { TrailsRepository } from '@modules/trails/infra/typeorm/repositories/TrailsRepository';
import { UserTrailsRepository } from '@modules/trails/infra/typeorm/repositories/UserTrailsRepository';
import { IPlatformUserRolesRepository } from '@modules/users/domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { PlatformUserRolesRepository } from '@modules/users/infra/typeorm/repositories/PlatformUserRolesRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { container } from 'tsyringe';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPlatformUserRolesRepository>(
  'PlatformUserRolesRepository',
  PlatformUserRolesRepository,
);

container.registerSingleton<IPlatformRolesRepository>(
  'PlatformRolesRepository',
  PlatformRolesRepository,
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

container.registerSingleton<IPlaylistsRepository>(
  'PlaylistsRepository',
  PlaylistsRepository,
);
