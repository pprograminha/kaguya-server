import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IPlaylistsRepository } from '../domain/repositories/iplaylists-repository';

@injectable()
class ListAllPlaylistsFromTrailService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute(trail_id: string): Promise<IPlaylist[]> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 400);
    }

    const playlists = await this.playlistsRepository.findAllPlaylistsFromTrail(
      trail_id,
    );

    return playlists;
  }
}

export { ListAllPlaylistsFromTrailService };
