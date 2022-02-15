import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';
import { ShowPlaylistRequestDTO } from '../dtos/ShowPlaylistRequestDTO';

@injectable()
class ShowPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
  ) {}

  async execute({
    playlist_id,
    name,
    trail_id,
  }: ShowPlaylistRequestDTO): Promise<IPlaylist> {
    if (!playlist_id && (!name || !trail_id))
      throw new AppError('Missing parameters', 400);

    let playlist: IPlaylist | undefined;

    if (playlist_id) {
      playlist = await this.playlistsRepository.findById(playlist_id);
    } else if (name && trail_id) {
      playlist = await this.playlistsRepository.findByName({
        name,
        trail_id,
      });
    }

    if (!playlist) {
      throw new AppError('Playlist does not exist', 403);
    }

    return playlist;
  }
}

export { ShowPlaylistService };
