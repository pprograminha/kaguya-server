import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IPlaylist } from '../domain/entities/iplaylist';
import { IPlaylistsRepository } from '../domain/repositories/playlists-repository';
import { IUserPlaylistsRepository } from '../domain/repositories/user-playlists-repository';
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
    slug,
    name,
  }: CreatePlaylistFromTrailRequestDTO): Promise<IPlaylist> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 12, 400);
    }

    const checkNameAlreadyExists = await this.playlistsRepository.findByName({
      name,
      trail_name: trail.name,
    });

    if (checkNameAlreadyExists) {
      throw new AppError('Name already exists', 23, 400);
    }

    const checkSlugAlreadyExists = await this.playlistsRepository.findBySlug({
      slug,
      trail_slug: trail.slug,
    });

    if (checkSlugAlreadyExists) {
      throw new AppError('Slug already exists', 23, 400);
    }

    const playlist = await this.playlistsRepository.create({
      description,
      name,
      slug,
      trail_id: trail.id,
    });

    const users = await this.usersRepository.findAllUsersAssociatedWithTheTrail(
      {
        trail_id: trail.id,
      },
    );

    const userPlaylistPromises = users.map(async user => {
      const userPlaylist = await this.userPlaylistsRepository.findOne({
        user_id: user.id,
        playlist_id: playlist.id,
      });

      if (!userPlaylist) {
        await this.userPlaylistsRepository.create({
          user_id: user.id,
          playlist_id: playlist.id,
          trail_id: trail.id,
        });
      }
    });

    await Promise.all(userPlaylistPromises);

    return playlist;
  }
}

export { CreatePlaylistFromTrailService };
