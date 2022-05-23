import { CreatePlaylistDTO } from '@modules/playlists/dtos/create-playlist-dto';
import { FindAllPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-playlists-from-trail-dto';
import { FindByNameDTO } from '@modules/playlists/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/playlists/dtos/find-by-slug-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { AsyncMaybe } from '@shared/types/app';
import { IPlaylist } from '../entities/iplaylist';

interface IPlaylistsRepository {
  create(data: CreatePlaylistDTO): Promise<IPlaylist>;
  save(playlist: IPlaylist): Promise<IPlaylist>;
  findById(playlist_id: string): AsyncMaybe<IPlaylist>;
  findByName(data: FindByNameDTO): AsyncMaybe<IPlaylist>;
  findBySlug(data: FindBySlugDTO): AsyncMaybe<IPlaylist>;
  destroyById(playlist_id: string): Promise<void>;
  findAllPlaylists(data?: FiltersDTO): Promise<IPlaylist[]>;
  findAllPlaylistsFromTrail(
    data: FindAllPlaylistsFromTrailDTO,
  ): Promise<IPlaylist[]>;
}
export { IPlaylistsRepository };
