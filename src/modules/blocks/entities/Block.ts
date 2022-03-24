import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IClass } from '@modules/classes/domain/entities/IClass';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { v4 as uuid } from 'uuid';

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
    if (!this.id) this.id = uuid();
  }
}

export { Block };
