import { IUserPlaylist } from './IUserPlaylist';

interface IPlaylist {
  id: string;
  avatar: string;
  name: string;
  description: string;
  trail_id: string;
  userPlaylists: IUserPlaylist[];
  created_at: Date;
  updated_at: Date;
}

export { IPlaylist };
