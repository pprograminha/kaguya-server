import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUser } from '@modules/users/domain/entities/iuser';
import crypto from 'crypto';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';

class UserPlaylist implements IUserPlaylist {
  id: string;

  progress: number;

  user_id: string;

  trail_id: string;

  playlist_id: string;

  trail: ITrail;

  user: IUser;

  playlist: IPlaylist;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { UserPlaylist };
