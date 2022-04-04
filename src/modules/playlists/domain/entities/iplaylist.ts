import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { IUserPlaylist } from './iuser-playlist';

interface IPlaylist {
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
}

export { IPlaylist };
