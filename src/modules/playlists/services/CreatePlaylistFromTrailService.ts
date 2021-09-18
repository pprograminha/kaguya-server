import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';
import { ICreatePlaylistFromTrailRequestDTO } from '../dtos/ICreatePlaylistFromTrailRequestDTO';

@injectable()
class CreatePlaylistFromTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
  ) {}

  async execute({
    trail_id,
    description,
    name,
  }: ICreatePlaylistFromTrailRequestDTO): Promise<IPlaylist> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 400);
    }

    const playlist = await this.playlistsRepository.create({
      description,
      name,
      trail_id: trail.id,
    });

    return playlist;
  }
}

export { CreatePlaylistFromTrailService };
