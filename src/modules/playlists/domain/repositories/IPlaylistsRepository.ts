import { ICreatePlaylistDTO } from '@modules/playlists/dtos/ICreatePlaylistDTO';
import { IPlaylist } from '../entities/IPlaylist';

interface IPlaylistsRepository {
  create(data: ICreatePlaylistDTO): Promise<IPlaylist>;
  save(playlist: IPlaylist): Promise<IPlaylist>;
  findById(playlist_id: string): Promise<IPlaylist | undefined>;
  destroyById(playlist_id: string): Promise<void>;
  findAllPlaylists(): Promise<IPlaylist[]>;
  findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]>;
}
export { IPlaylistsRepository };
