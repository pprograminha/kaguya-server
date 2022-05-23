import { ILesson } from '@modules/lessons/domain/entities/ilesson';
import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUserBlock } from './iuser-block';

interface IBlock {
  id: string;
  name: string;
  playlist: IPlaylist;
  lessons: ILesson[];
  user_blocks: IUserBlock[];
  playlist_id: string;
  created_at: Date;
  updated_at: Date;
}

export { IBlock };
