import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserTrail } from './IUserTrail';

interface ITrail {
  id: string;
  name: string;
  description: string;
  playlists: IPlaylist[];
  user_trails: IUserTrail[];
  user_playlists: IUserPlaylist[];
  avatar: string;
  getAvatarUrl(): string | null;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
export { ITrail };
