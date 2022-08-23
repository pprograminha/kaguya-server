import { CreateUserPlaylistDTO } from '@modules/playlists/dtos/create-user-playlist-dto';
import { FindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-user-playlists-from-trail-dto';
import { FindOneDTO } from '@modules/playlists/dtos/find-one-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUserPlaylist } from '../entities/iuser-playlist';

export type FindUserPlaylistDTO = { trail_id: string } & FindOneDTO;
interface IUserPlaylistsRepository {
  create(data: CreateUserPlaylistDTO): Promise<IUserPlaylist>;
  createMany(datas: CreateUserPlaylistDTO[]): Promise<IUserPlaylist[]>;
  findById(user_playlist_id: string): AsyncMaybe<IUserPlaylist>;
  findOne(data: FindOneDTO): AsyncMaybe<IUserPlaylist>;
  findUserPlaylist(data: FindUserPlaylistDTO): AsyncMaybe<IUserPlaylist>;
  save(userPlaylist: IUserPlaylist): Promise<void>;
  removeById(user_playlist_id: string): Promise<void>;
  findAllUserPlaylistsFromTrail(
    data: FindAllUserPlaylistsFromTrailDTO,
  ): Promise<IUserPlaylist[]>;
}
export { IUserPlaylistsRepository };
