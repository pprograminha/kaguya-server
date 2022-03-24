import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUser } from '@modules/users/domain/entities/IUser';
import { v4 as uuid } from 'uuid';

class UserBlock implements IUserBlock {
  id: string;

  progress: number;

  user_id: string;

  block: IBlock;

  playlist: IPlaylist;

  user: IUser;

  playlist_id: string;

  block_id: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}

export { UserBlock };
