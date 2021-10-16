import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { IUserPlaylist } from './IUserPlaylist';

interface IPlaylist {
  id: string;
  avatar: string;
  name: string;
  description: string;
  trail_id: string;
  trail: ITrail;
  user_playlists: IUserPlaylist[];
  created_at: Date;
  updated_at: Date;
}

export { IPlaylist };
