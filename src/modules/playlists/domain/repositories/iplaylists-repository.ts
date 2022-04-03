import { CreatePlaylistDTO } from '@modules/playlists/dtos/create-playlist-dto';
import { FindByNameDTO } from '@modules/playlists/dtos/find-by-name-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IPlaylist } from '../entities/iplaylist';

interface IPlaylistsRepository {
  create(data: CreatePlaylistDTO): Promise<IPlaylist>;
  save(playlist: IPlaylist): Promise<IPlaylist>;
  findById(playlist_id: string): AsyncMaybe<IPlaylist>;
  findByName(data: FindByNameDTO): AsyncMaybe<IPlaylist>;
  destroyById(playlist_id: string): Promise<void>;
  findAllPlaylists(): Promise<IPlaylist[]>;
  findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]>;
}
export { IPlaylistsRepository };
