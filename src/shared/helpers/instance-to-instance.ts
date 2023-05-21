import { storageConfig, StorageDrivers } from '@config/storage';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { IUser } from '@modules/users/domain/entities/iuser';

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

type Instance<T extends IUser | IPlaylist | ITrail> = T extends IUser
  ? User
  : T extends ITrail
  ? Trail
  : Playlist;

type InstanceType = 'user' | 'trail' | 'playlist';

function getAvatarUrl<T extends { [key: string]: any }>(
  instance: T,
): string | null {
  if (!instance.avatar) return null;

  const providersUrl: Record<StorageDrivers, string> = {
    s3: `https://${storageConfig.config.s3.bucket}.s3.amazonaws.com/${instance.avatar}`,
    disk: `${process.env.APP_API_URL}/static/${instance.avatar}`,
  };

  if (instance.avatar_url) {
    return instance.avatar_url;
  }

  return providersUrl[storageConfig.driver];
}

export function instanceToInstance<T extends IUser | IPlaylist | ITrail>(
  instance_type: InstanceType,
  instance: T,
): Instance<T> {
  const instanceFormatted = {
    user: {
      ...(instance as IUser),
      password: undefined,
      avatar_url: getAvatarUrl(instance as IUser),
    } as Instance<T>,

    playlist: {
      ...(instance as IPlaylist),
      avatar_url: getAvatarUrl(instance as IPlaylist),
    } as Instance<T>,

    trail: {
      ...(instance as ITrail),
      avatar_url: getAvatarUrl(instance as ITrail),
    } as Instance<T>,
  }[instance_type];

  return instanceFormatted as Instance<T>;
}
