import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IPlaylistsRepository } from '../domain/repositories/playlists-repository';
import { ListAllPlaylistsFromTrailRequestDTO } from '../dtos/list-all-playlists-from-trail-request-dto';

type Response = {
  user_playlists: undefined;
  user_playlist: {
    progress: number;
  } | null;
  id: string;
  avatar: string;
  name: string;
  description: string;
  trail_id: string;
  trail: ITrail;
  blocks: IBlock[];
  created_at: Date;
  updated_at: Date;
}[];

@injectable()
class ListAllPlaylistsFromTrailService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
    order,
    skip,
    take,
  }: ListAllPlaylistsFromTrailRequestDTO): Promise<Response> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 12, 400);
    }

    const playlists = await this.playlistsRepository.findAllPlaylistsFromTrail({
      trail_id,
      order,
      skip,
      take,
    });

    const playlistsWithProgressField = playlists.map(playlist => {
      const userPlaylist = playlist.user_playlists.find(
        user_playlist =>
          user_playlist.playlist_id === playlist.id &&
          user_playlist.user_id === user_id,
      );

      return {
        ...playlist,
        user_playlists: undefined,
        user_playlist: userPlaylist
          ? {
              progress: userPlaylist.progress,
            }
          : null,
      };
    });

    return playlistsWithProgressField;
  }
}

export { ListAllPlaylistsFromTrailService };
