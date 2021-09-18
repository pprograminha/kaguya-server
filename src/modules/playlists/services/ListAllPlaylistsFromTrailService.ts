import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';

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