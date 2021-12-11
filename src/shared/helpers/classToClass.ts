import { storageConfig } from '@config/storage';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUser } from '@modules/users/domain/entities/IUser';

type User = Omit<IUser, 'password'> & {
  password: undefined;
  avatar_url: string | null;
};

type Trail = ITrail & {
  avatar_url: string | null;
};

type Playlist = IPlaylist & {
  avatar_url: string | null;
};

type Entity<T extends IUser | IPlaylist | ITrail> = T extends IUser
  ? User
  : T extends ITrail
  ? Trail
  : Playlist;

type EntityTypes = 'user' | 'trail' | 'playlist';

function getAvatarUrl(entity: IUser | ITrail | IPlaylist) {
  if (!entity.avatar) return null;

  const providersUrl = {
    s3: 'https://s3.com',
    disk: `${process.env.APP_API_URL}/static/${entity.avatar}`,
  };

  return providersUrl[storageConfig.driver];
}

export function classToClass<T extends IUser | IPlaylist | ITrail>(
  entity_type: EntityTypes,
  entities: T,
): Entity<T> {
  const entity = {
    user: {
      ...(entities as IUser),
      password: undefined,
      avatar_url: getAvatarUrl(entities as IUser),
    } as Entity<T>,

    playlist: {
      ...(entities as IPlaylist),
      avatar_url: getAvatarUrl(entities as IPlaylist),
    } as Entity<T>,

    trail: {
      ...(entities as ITrail),
      avatar_url: getAvatarUrl(entities as ITrail),
    } as Entity<T>,
  }[entity_type];

  return entity as Entity<T>;
}
