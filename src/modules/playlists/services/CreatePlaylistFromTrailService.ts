import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IPlaylist } from '../domain/entities/IPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';
import { IUserPlaylistsRepository } from '../domain/repositories/IUserPlaylistsRepository';
import { ICreatePlaylistFromTrailRequestDTO } from '../dtos/ICreatePlaylistFromTrailRequestDTO';

@injectable()
class CreatePlaylistFromTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,
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

    const users = await this.usersRepository.findAllUsersAssociatedWithTheTrail(
      {
        trail_id: trail.id,
      },
    );

    const userBlockPromises = users.map(async user => {
      await this.userPlaylistsRepository.create({
        user_id: user.id,
        trail_id: trail.id,
        playlist_id: playlist.id,
      });
    });

    await Promise.all(userBlockPromises);

    return playlist;
  }
}

export { CreatePlaylistFromTrailService };
