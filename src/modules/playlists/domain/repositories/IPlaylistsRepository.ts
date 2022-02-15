import { CreatePlaylistDTO } from '@modules/playlists/dtos/CreatePlaylistDTO';
import { IFindByNameDTO } from '@modules/playlists/dtos/IFindByNameDTO';
import { IPlaylist } from '../entities/IPlaylist';

interface IPlaylistsRepository {
  create(data: CreatePlaylistDTO): Promise<IPlaylist>;
  save(playlist: IPlaylist): Promise<IPlaylist>;
  findById(playlist_id: string): Promise<IPlaylist | undefined>;
  findByName(data: IFindByNameDTO): Promise<IPlaylist | undefined>;
  destroyById(playlist_id: string): Promise<void>;
  findAllPlaylists(): Promise<IPlaylist[]>;
  findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]>;
}
export { IPlaylistsRepository };
