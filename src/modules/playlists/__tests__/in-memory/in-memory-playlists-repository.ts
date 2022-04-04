import { IPlaylist } from '@modules/playlists/domain/entities/iplaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { CreatePlaylistDTO } from '@modules/playlists/dtos/create-playlist-dto';
import { FindAllPlaylistsFromTrailDTO } from '@modules/playlists/dtos/find-all-playlists-from-trail-dto';
import { FindByNameDTO } from '@modules/playlists/dtos/find-by-name-dto';
import { Playlist } from '@modules/playlists/entities/playlist';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryPlaylistsRepository implements IPlaylistsRepository {
  private playlists: IPlaylist[] = [];

  async findAllPlaylistsFromTrail({
    trail_id,
  }: FindAllPlaylistsFromTrailDTO): Promise<IPlaylist[]> {
    const playlists = this.playlists.filter(
      playlist => playlist.trail_id === trail_id,
    );

    return playlists;
  }

  async findByName({ name }: FindByNameDTO): AsyncMaybe<IPlaylist> {
    const playlistFinded = this.playlists.find(
      playlist => playlist.name === name,
    );

    return playlistFinded;
  }

  async save(playlist: IPlaylist): Promise<IPlaylist> {
    const indexFinded = this.playlists.findIndex(
      findPlaylist => findPlaylist.id === playlist.id,
    );

    this.playlists[indexFinded] = playlist;

    return playlist;
  }

  async findById(playlist_id: string): AsyncMaybe<IPlaylist> {
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

  async create(data: CreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = new Playlist();

    Object.assign(playlist, data);

    this.playlists.push(playlist);

    return playlist;
  }
}

export { InMemoryPlaylistsRepository };
