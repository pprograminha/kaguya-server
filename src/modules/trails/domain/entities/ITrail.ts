import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IUserTrail } from './IUserTrail';

interface ITrail {
  id: string;
  name: string;
  description: string;
  playlists: IPlaylist[];
  userTrails: IUserTrail[];
  avatar: string;
  getAvatarUrl(): string | null;
  avatar_url: string;
  created_at: Date;
  updated_at: Date;
}
export { ITrail };
