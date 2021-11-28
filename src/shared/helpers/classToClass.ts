import { storageConfig } from '@config/storage';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUser } from '@modules/users/domain/entities/IUser';

type User = Omit<IUser, 'password'> & {
  password: undefined;
  avatar_url: string | null;
};

type Entity<T extends IUser | IUser[]> = T extends IUser ? User : User[];

type EntityTypes = 'user' | 'users';

function getAvatarUrl(entity: IUser | ITrail | IPlaylist) {
  if (!entity.avatar) return null;

  const providersUrl = {
    s3: 'https://s3.com',
    disk: `${process.env.APP_API_URL}/static/${entity.avatar}`,
  };

  return providersUrl[storageConfig.driver];
}

export function classToClass<T extends IUser | IUser[]>(
  entity_type: EntityTypes,
  entities: T,
): Entity<T> {
  const entity = {
    user: {
      ...entities,
      password: undefined,
      avatar_url: getAvatarUrl(entities as IUser),
    } as unknown as Entity<T>,

    users: (entities as IUser[]).map(user => ({
      ...user,
      password: undefined,
      avatar_url: getAvatarUrl(user),
    })) as unknown as Entity<T>,
  }[entity_type];

  return entity;
}
