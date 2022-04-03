import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IPlaylistsRepository } from '../domain/repositories/iplaylists-repository';
import { IUserPlaylistsRepository } from '../domain/repositories/iuser-playlists-repository';
import { CreatePlaylistFromTrailRequestDTO } from '../dtos/create-playlist-from-trail-request-dto';

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
  }: CreatePlaylistFromTrailRequestDTO): Promise<IPlaylist> {
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

    const userPlaylistPromises = users.map(user =>
      this.userPlaylistsRepository.create({
        user_id: user.id,
        trail_id: trail.id,
        playlist_id: playlist.id,
      }),
    );

    await Promise.all(userPlaylistPromises);

    return playlist;
  }
}

export { CreatePlaylistFromTrailService };
