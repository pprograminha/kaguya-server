import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { Maybe } from '@shared/types/app';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IPlaylistsRepository } from '../domain/repositories/playlists-repository';
import { ShowPlaylistRequestDTO } from '../dtos/show-playlist-request-dto';

@injectable()
class ShowPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
  ) {}

  async execute({
    playlist_id,
    playlist_slug,
    trail_slug,
  }: ShowPlaylistRequestDTO): Promise<IPlaylist> {
    if (!playlist_id && (!playlist_slug || !trail_slug))
      throw new AppError('Missing parameters', 8, 400);

    let playlist: Maybe<IPlaylist>;

    if (playlist_id) {
      playlist = await this.playlistsRepository.findById(playlist_id);
    } else if (playlist_slug && trail_slug) {
      playlist = await this.playlistsRepository.findBySlug({
        slug: playlist_slug,
        trail_slug,
      });
    }

    if (!playlist) {
      throw new AppError('Playlist does not exist', 12, 400);
    }

    return playlist;
  }
}

export { ShowPlaylistService };
