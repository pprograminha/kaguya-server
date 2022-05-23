import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import crypto from 'crypto';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';

class Playlist implements IPlaylist {
  id: string;

  avatar: string;

  name: string;

  slug: string;

  description: string;

  trail_id: string;

  trail: ITrail;

  blocks: IBlock[];

  user_playlists: IUserPlaylist[];

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}
export { Playlist };
