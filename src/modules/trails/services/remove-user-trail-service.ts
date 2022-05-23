import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { IUserLessonsRepository } from '@modules/lessons/domain/repositories/user-lessons-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/user-playlists-repository';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { DestroyUserTrailRequestDTO } from '../dtos/destroy-user-trail-request-dto';

@injectable()
export class RemoveUserTrailService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,

    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: DestroyUserTrailRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 401);

    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 12, 400);

    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id,
      user_id,
    });

    if (!userTrail) throw new AppError('User Trail does not exist', 13, 400);

    await this.userTrailsRepository.removeById(userTrail.id);

    const userPlaylists =
      await this.userPlaylistsRepository.findAllUserPlaylistsFromTrail({
        trail_id: userTrail.trail_id,
        user_id,
      });

    userPlaylists.map(async userPlaylist => {
      await this.userPlaylistsRepository.removeById(userPlaylist.id);

      const userBlocks =
        await this.userBlocksRepository.findAllUserBlocksFromPlaylist({
          playlist_id: userPlaylist.playlist_id,
          user_id,
        });

      userBlocks.map(async userBlock => {
        await this.userBlocksRepository.removeById(userBlock.id);

        const userLessons =
          await this.userLessonsRepository.findAllUserLessonsFromBlock({
            block_id: userBlock.block_id,
            user_id,
          });

        userLessons.map(async userLesson => {
          await this.userLessonsRepository.removeById(userLesson.id);
        });
      });
    });
  }
}
