import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import crypto from 'crypto';
import { ITrail } from '../domain/entities/itrail';
import { IUserTrail } from '../domain/entities/iuser-trail';

class Trail implements ITrail {
  id: string;

  name: string;

  slug: string;

  description: string;

  playlists: IPlaylist[];

  user_trails: IUserTrail[];

  user_playlists: IUserPlaylist[];

  avatar: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { Trail };
