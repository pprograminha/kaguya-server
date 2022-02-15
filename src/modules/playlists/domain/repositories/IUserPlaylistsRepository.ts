import { ICreateUserPlaylistDTO } from '@modules/playlists/dtos/ICreateUserPlaylistDTO';
import { IFindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/IFindAllUserPlaylistsFromTrailDTO';
import { IFindOneDTO } from '@modules/playlists/dtos/IFindOneDTO';
import { IUserPlaylist } from '../entities/IUserPlaylist';

interface IUserPlaylistsRepository {
  create(data: ICreateUserPlaylistDTO): Promise<IUserPlaylist>;
  createMany(datas: ICreateUserPlaylistDTO[]): Promise<IUserPlaylist[]>;
  findById(user_playlist_id: string): Promise<IUserPlaylist | undefined>;
  findOne(data: IFindOneDTO): Promise<IUserPlaylist | undefined>;
  save(userPlaylist: IUserPlaylist): Promise<void>;
  removeById(user_playlist_id: string): Promise<void>;
  findAllUserPlaylistsFromTrail(
    data: IFindAllUserPlaylistsFromTrailDTO,
  ): Promise<IUserPlaylist[]>;
}
export { IUserPlaylistsRepository };
