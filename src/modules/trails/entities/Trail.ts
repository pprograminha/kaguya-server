import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { v4 as uuid } from 'uuid';
import { ITrail } from '../domain/entities/ITrail';
import { IUserTrail } from '../domain/entities/IUserTrail';

class Trail implements ITrail {
  id: string;

  name: string;

  description: string;

  playlists: IPlaylist[];

  user_trails: IUserTrail[];

  user_playlists: IUserPlaylist[];

  avatar: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Trail };
