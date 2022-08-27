import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/user-trails-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
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

    const userPlaylistsCreate = await Promise.all(
      playlists.map(async playlist => {
        const userPlaylist = await this.userPlaylistsRepository.findOne({
          playlist_id: playlist.id,
          user_id: user.id,
        });

        if (userPlaylist) return null;

        return {
          user_id: user.id,
          trail_id: trail.id,
          playlist_id: playlist.id,
        };
      }),
    );

    const filteredUserPlaylistsCreate = userPlaylistsCreate.filter(
      userPlaylistCreate => !!userPlaylistCreate,
    ) as {
      user_id: string;
      trail_id: string;
      playlist_id: string;
    }[];

    await Promise.all(
      playlists.map(async playlist => {
        const blocks = await this.blocksRepository.findAllBlocksFromPlaylist({
          playlist_id: playlist.id,
        });

        await Promise.all(
          blocks.map(async block => {
            const userBlock = await this.userBlocksRepository.findOne({
              block_id: block.id,
              user_id: user.id,
            });

            if (!userBlock) {
              await this.userBlocksRepository.create({
                block_id: block.id,
                user_id: user.id,
                playlist_id: playlist.id,
              });
            }

            const lessons =
              await this.lessonsRepository.findAllLessonsFromBlock({
                block_id: block.id,
              });

            await Promise.all(
              lessons.map(async _lesson => {
                const userLesson = await this.userLessonsRepository.findOne({
                  user_id: user.id,
                  lesson_id: _lesson.id,
                });

                if (!userLesson)
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
      filteredUserPlaylistsCreate,
    );

    await this.userTrailsRepository.save(userTrail);

    return userPlaylists;
  }
}

export { CreateUserPlaylistsService };
