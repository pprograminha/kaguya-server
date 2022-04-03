import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IClass } from '@modules/classes/domain/entities/iclass';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import crypto from 'crypto';
import { IUserBlock } from '../domain/entities/iuser-block';

class Block implements IBlock {
  id: string;

  name: string;

  playlist: IPlaylist;

  user_blocks: IUserBlock[];

  classes: IClass[];

  playlist_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    this.id = crypto.randomUUID();
  }
}

export { Block };
