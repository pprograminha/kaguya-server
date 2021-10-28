import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUserRole } from './IUserRole';

interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  user_roles: IUserRole[];
  user_trails: IUserTrail[];
  user_playlists: IUserPlaylist[];
  user_classes: IUserClass[];
  user_blocks: IUserBlock[];
  username: string;
  enabled: boolean;
  password: string;
  getAvatarUrl(): string | null;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
export { IUser };
