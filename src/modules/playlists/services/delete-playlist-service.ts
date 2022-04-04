import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IPlaylistsRepository } from '../domain/repositories/playlists-repository';

@injectable()
class DeletePlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
  ) {}

  async execute(playlist_id: string): Promise<void> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('Playlist does not exist', 400);
    }

    await this.playlistsRepository.destroyById(playlist.id);
  }
}

export { DeletePlaylistService };
