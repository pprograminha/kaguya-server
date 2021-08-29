import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserPlaylist } from '../domain/entities/IUserPlaylist';
import { IPlaylistsRepository } from '../domain/repositories/IPlaylistsRepository';
import { IUserPlaylistsRepository } from '../domain/repositories/IUserPlaylistsRepository';
import { ICreateUserPlaylistsRequestDTO } from '../dtos/ICreateUserPlaylistsRequestDTO';

@injectable()
class CreateUserPlaylistsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: ICreateUserPlaylistsRequestDTO): Promise<IUserPlaylist[]> {
    const user = await this.usersRepository.findById(user_id);
    const trail = await this.trailsRepository.findById(trail_id);

    const playlists = await this.playlistsRepository.findAllPlaylistsFromTrail(
      trail_id,
    );

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    if (!trail) {
      throw new AppError('Trail does not exist', 400);
    }

    const promises = playlists.map(playlist => {
      return this.userPlaylistsRepository.create({
        user_id: user.id,
        trail_id: trail.id,
        playlist_id: playlist.id,
      });
    });

    const userPlaylists = await Promise.all(promises);

    return userPlaylists;
  }
}

export { CreateUserPlaylistsService };
