import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import { IUserTrail } from './iuser-trail';

interface ITrail {
  id: string;
  name: string;
  description: string;
  playlists: IPlaylist[];
  user_trails: IUserTrail[];
  user_playlists: IUserPlaylist[];
  avatar: string;
  created_at: Date;
  updated_at: Date;
}
export { ITrail };
