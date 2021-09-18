import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { ICreatePlaylistDTO } from '@modules/playlists/dtos/ICreatePlaylistDTO';
import { Playlist } from '@modules/playlists/infra/typeorm/entities/Playlist';

class FakePlaylistsRepository implements IPlaylistsRepository {
  private playlists: IPlaylist[] = [];

  async save(playlist: IPlaylist): Promise<IPlaylist> {
    const indexFinded = this.playlists.findIndex(
      findPlaylist => findPlaylist.id === playlist.id,
    );

    this.playlists[indexFinded] = playlist;

    return playlist;
  }

  async findById(playlist_id: string): Promise<IPlaylist | undefined> {
    const playlistFinded = this.playlists.find(
      playlist => playlist.id === playlist_id,
    );

    return playlistFinded;
  }

  async destroyById(playlist_id: string): Promise<void> {
    const playlists = this.playlists.filter(
      playlist => playlist.id !== playlist_id,
    );

    this.playlists = playlists;
  }

  async findAllPlaylists(): Promise<IPlaylist[]> {
    return this.playlists;
  }

  async findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]> {
    return this.playlists.filter(playlist => playlist.trail_id === trail_id);
  }

  async create(data: ICreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = new Playlist();

    Object.assign(playlist, data);

    this.playlists.push(playlist);

    return playlist;
  }
}

export { FakePlaylistsRepository };
