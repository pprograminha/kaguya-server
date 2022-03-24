import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IUserPlaylist } from '../domain/entities/IUserPlaylist';
import { IUserPlaylistsRepository } from '../domain/repositories/IUserPlaylistsRepository';
import { IListAllUserPlaylistsFromTrailRequestDTO } from '../dtos/IListAllUserPlaylistsFromTrailRequestDTO';

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
  }: IListAllUserPlaylistsFromTrailRequestDTO): Promise<IUserPlaylist[]> {
    const user = await this.usersRepository.findById(user_id);
    const trail = await this.trailsRepository.findById(trail_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    if (!trail) {
      throw new AppError('Trail does not exist', 400);
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
