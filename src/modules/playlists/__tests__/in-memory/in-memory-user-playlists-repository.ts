import { IUserPlaylist } from '@modules/playlists/domain/entities/iuser-playlist';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/user-playlists-repository';
import { CreateUserPlaylistDTO } from '@modules/playlists/dtos/create-user-playlist-dto';
import { FindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-user-playlists-from-trail-dto';
import { FindOneDTO } from '@modules/playlists/dtos/find-one-dto';
import { UserPlaylist } from '@modules/playlists/entities/user-playlist';
import { AsyncMaybe } from '@shared/types/app';

export class InMemoryUserPlaylistsRepository
  implements IUserPlaylistsRepository
{
  private userPlaylists: IUserPlaylist[] = [];

  async findOne({
    playlist_id,
    user_id,
  }: FindOneDTO): AsyncMaybe<IUserPlaylist> {
    const userPlaylistFinded = this.userPlaylists.find(
      userPlaylist =>
        userPlaylist.playlist_id === playlist_id &&
        userPlaylist.user_id === user_id,
    );

    return userPlaylistFinded;
  }

  async save(userPlaylist: IUserPlaylist): Promise<void> {
    const userPlaylistIndex = this.userPlaylists.findIndex(
      findUserPlaylist => findUserPlaylist.id === userPlaylist.id,
    );

    this.userPlaylists[userPlaylistIndex] = userPlaylist;
  }

  async createMany(datas: CreateUserPlaylistDTO[]): Promise<IUserPlaylist[]> {
    return datas.map(data => {
      const userPlaylist = new UserPlaylist();

      Object.assign(userPlaylist, data);

      this.userPlaylists.push(userPlaylist);

      return userPlaylist;
    });
  }

  async create(data: CreateUserPlaylistDTO): Promise<IUserPlaylist> {
    const userPlaylist = new UserPlaylist();

    Object.assign(userPlaylist, data);

    this.userPlaylists.push(userPlaylist);

    return userPlaylist;
  }

  async findById(user_playlist_id: string): AsyncMaybe<IUserPlaylist> {
    const userPlaylistFinded = this.userPlaylists.find(
      userPlaylist => userPlaylist.id === user_playlist_id,
    );

    return userPlaylistFinded;
  }

  async removeById(user_playlist_id: string): Promise<void> {
    const userPlaylistIndex = this.userPlaylists.findIndex(
      userPlaylist => userPlaylist.id === user_playlist_id,
    );

    this.userPlaylists.splice(userPlaylistIndex, 1);
  }

  async findAllUserPlaylistsFromTrail({
    trail_id,
    user_id,
  }: FindAllUserPlaylistsFromTrailDTO): Promise<IUserPlaylist[]> {
    const userPlaylists = this.userPlaylists.filter(
      userPlaylist =>
        userPlaylist.trail_id === trail_id && userPlaylist.user_id === user_id,
    );

    return userPlaylists;
  }
}
