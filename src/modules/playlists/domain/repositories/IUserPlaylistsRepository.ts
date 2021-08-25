import { ICreateUserPlaylistDTO } from '@modules/playlists/dtos/ICreateUserPlaylistDTO';
import { IFindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/IFindAllUserPlaylistsFromTrailDTO';
import { IUserPlaylist } from '../entities/IUserPlaylist';

interface IUserPlaylistsRepository {
  create(data: ICreateUserPlaylistDTO): Promise<IUserPlaylist>;
  findById(user_playlist_id: string): Promise<IUserPlaylist | undefined>;
  removeById(user_playlist_id: string): Promise<void>;
  findAllUserPlaylistsFromTrail(
    data: IFindAllUserPlaylistsFromTrailDTO,
  ): Promise<IUserPlaylist[]>;
}
export { IUserPlaylistsRepository };
