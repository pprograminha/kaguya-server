import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/user-trails-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';
import { IPlaylistsRepository } from '../domain/repositories/playlists-repository';
import { IUserPlaylistsRepository } from '../domain/repositories/user-playlists-repository';
import { CreateUserPlaylistsRequestDTO } from '../dtos/create-user-playlists-request-dto';

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

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,

    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,

    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
    order,
    skip,
    take,
  }: CreateUserPlaylistsRequestDTO): Promise<IUserPlaylist[]> {
    const user = await this.usersRepository.findById(user_id);
    const trail = await this.trailsRepository.findById(trail_id);

    const playlists = await this.playlistsRepository.findAllPlaylistsFromTrail({
      trail_id,
      order,
      skip,
      take,
    });

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    if (!trail) {
      throw new AppError('Trail does not exist', 12, 400);
    }

    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id: trail.id,
      user_id: user.id,
    });

    if (!userTrail) {
      throw new AppError('User trail does not exist', 13, 400);
    }

    const userPlaylistsCreate = playlists.map(playlist => ({
      user_id: user.id,
      trail_id: trail.id,
      playlist_id: playlist.id,
    }));

    await Promise.all(
      playlists.map(async playlist => {
        const blocks = await this.blocksRepository.findAllBlocksFromPlaylist({
          playlist_id: playlist.id,
        });

        await Promise.all(
          blocks.map(async block => {
            await this.userBlocksRepository.create({
              block_id: block.id,
              user_id: user.id,
              playlist_id: playlist.id,
            });

            const lessons =
              await this.lessonsRepository.findAllLessonsFromBlock({
                block_id: block.id,
              });

            await Promise.all(
              lessons.map(async _lesson => {
                await this.userLessonsRepository.create({
                  block_id: block.id,
                  user_id: user.id,
                  lesson_id: _lesson.id,
                  completed: false,
                });
              }),
            );
          }),
        );
      }),
    );

    const userPlaylists = await this.userPlaylistsRepository.createMany(
      userPlaylistsCreate,
    );

    await this.userTrailsRepository.save(userTrail);

    return userPlaylists;
  }
}

export { CreateUserPlaylistsService };
