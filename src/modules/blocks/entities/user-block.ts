import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUser } from '@modules/users/domain/entities/iuser';
import crypto from 'crypto';
import { IUserBlock } from '../domain/entities/iuser-block';

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
    this.id = crypto.randomUUID();
  }
}

export { UserBlock };
