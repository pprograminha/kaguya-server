import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';
import { IUserPlaylistsRepository } from '../domain/repositories/user-playlists-repository';
import { ListAllUserPlaylistsFromTrailRequestDTO } from '../dtos/list-all-user-playlists-from-trail-request-dto';

@injectable()
class ListAllUserPlaylistsFromTrailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: ListAllUserPlaylistsFromTrailRequestDTO): Promise<IUserPlaylist[]> {
    const user = await this.usersRepository.findById(user_id);
    const trail = await this.trailsRepository.findById(trail_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    if (!trail) {
      throw new AppError('Trail does not exist', 12, 400);
    }

    const userPlaylists =
      await this.userPlaylistsRepository.findAllUserPlaylistsFromTrail({
        user_id,
        trail_id,
      });

    return userPlaylists;
  }
}

export { ListAllUserPlaylistsFromTrailService };
