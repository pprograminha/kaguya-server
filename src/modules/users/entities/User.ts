import { v4 as uuid } from 'uuid';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IUserClass } from '@modules/classes/domain/entities/IUserClass';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUser } from '@modules/users/domain/entities/IUser';
import { IUserRole } from '@modules/users/domain/entities/IUserRole';

class User implements IUser {
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

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { User };
