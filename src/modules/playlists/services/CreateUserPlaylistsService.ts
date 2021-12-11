import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
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

    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

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

    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id: trail.id,
      user_id: user.id,
    });

    if (!userTrail) {
      throw new AppError('User trail does not exist', 403);
    }

    const userPlaylistsCreate = playlists.map(playlist => ({
      user_id: user.id,
      trail_id: trail.id,
      playlist_id: playlist.id,
    }));

    const userPlaylists = await this.userPlaylistsRepository.createMany(
      userPlaylistsCreate,
    );

    userTrail.playlists_amount = userPlaylists.length;

    await this.userTrailsRepository.save(userTrail);

    return userPlaylists;
  }
}

export { CreateUserPlaylistsService };
