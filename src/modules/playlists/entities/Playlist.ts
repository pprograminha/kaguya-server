import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { v4 as uuid } from 'uuid';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IUserPlaylist } from '../domain/entities/IUserPlaylist';

class Playlist implements IPlaylist {
  id: string;

  avatar: string;

  name: string;

  description: string;

  trail_id: string;

  trail: ITrail;

  blocks: IBlock[];

  user_playlists: IUserPlaylist[];

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
export { Playlist };
