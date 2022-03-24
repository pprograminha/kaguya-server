import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUser } from '@modules/users/domain/entities/IUser';
import { v4 as uuid } from 'uuid';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IUserPlaylist } from '../domain/entities/IUserPlaylist';

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
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { UserPlaylist };
