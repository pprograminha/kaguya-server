import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';
import { IShowPlaylistRequestDTO } from '../dtos/IShowPlaylistRequestDTO';

@injectable()
class ShowPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
  ) {}

  async execute({ playlist_id }: IShowPlaylistRequestDTO): Promise<IPlaylist> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('Playlist does not exist', 403);
    }

    return playlist;
  }
}

export { ShowPlaylistService };
