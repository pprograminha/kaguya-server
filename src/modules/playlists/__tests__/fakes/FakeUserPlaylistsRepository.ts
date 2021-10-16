import { IUserPlaylist } from '@modules/playlists/domain/entities/IUserPlaylist';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { ICreateUserPlaylistDTO } from '@modules/playlists/dtos/ICreateUserPlaylistDTO';
import { IFindAllUserPlaylistsFromTrailDTO } from '@modules/playlists/dtos/IFindAllUserPlaylistsFromTrailDTO';
import { UserPlaylist } from '@modules/playlists/infra/typeorm/entities/UserPlaylist';

export class FakeUserPlaylistsRepository implements IUserPlaylistsRepository {
  private userPlaylists: IUserPlaylist[] = [];

  async createMany(datas: ICreateUserPlaylistDTO[]): Promise<IUserPlaylist[]> {
    return datas.map(data => {
      const userPlaylist = new UserPlaylist();

      Object.assign(userPlaylist, data);

      this.userPlaylists.push(userPlaylist);

      return userPlaylist;
    });
  }

  async create(data: ICreateUserPlaylistDTO): Promise<IUserPlaylist> {
    const userPlaylist = new UserPlaylist();

    Object.assign(userPlaylist, data);

    this.userPlaylists.push(userPlaylist);

    return userPlaylist;
  }

  async findById(user_playlist_id: string): Promise<IUserPlaylist | undefined> {
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
  }: IFindAllUserPlaylistsFromTrailDTO): Promise<IUserPlaylist[]> {
    const userPlaylists = this.userPlaylists.filter(
      userPlaylist =>
        userPlaylist.trail_id === trail_id && userPlaylist.user_id === user_id,
    );

    return userPlaylists;
  }
}
