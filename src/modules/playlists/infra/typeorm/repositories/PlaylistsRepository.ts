import { IPlaylist } from '@modules/playlists/domain/entities/IPlaylist';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { CreatePlaylistDTO } from '@modules/playlists/dtos/CreatePlaylistDTO';
import { getRepository, Repository } from 'typeorm';
import { Playlist } from '../entities/Playlist';

export class PlaylistsRepository implements IPlaylistsRepository {
  private ormRepository: Repository<IPlaylist>;

  constructor() {
    this.ormRepository = getRepository(Playlist);
  }

  async save(playlist: IPlaylist): Promise<IPlaylist> {
    const playlistSaved = await this.ormRepository.save(playlist);

    return playlistSaved;
  }

  async findAllPlaylists(): Promise<IPlaylist[]> {
    const playlists = await this.ormRepository.find();

    return playlists;
  }

  async create({
    description,
    name,
    trail_id,
  }: CreatePlaylistDTO): Promise<IPlaylist> {
    const playlist = this.ormRepository.create({
      description,
      name,
      trail_id,
    });

    await this.ormRepository.save(playlist);

    return playlist;
  }

  async findById(user_playlist_id: string): Promise<IPlaylist | undefined> {
    const userPlaylist = await this.ormRepository.findOne({
      where: {
        id: user_playlist_id,
      },
    });

    return userPlaylist;
  }

  async destroyById(playlist_id: string): Promise<void> {
    await this.ormRepository.delete(playlist_id);
  }

  async findAllPlaylistsFromTrail(trail_id: string): Promise<IPlaylist[]> {
    const playlists = await this.ormRepository.find({
      where: {
        trail_id,
      },
    });

    return playlists;
  }
}
