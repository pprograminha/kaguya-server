import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { IUserClassesRepository } from '@modules/classes/domain/repositories/IUserClassesRepository';
import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { IDestroyUserTrailRequestDTO } from '../dtos/IDestroyUserTrailRequestDTO';

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

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: IDestroyUserTrailRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 401);

    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 400);

    const userTrail = await this.userTrailsRepository.findOne({
      trail_id,
      user_id,
    });

    if (!userTrail) throw new AppError('User Trail does not exist', 400);

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

        const userClasses =
          await this.userClassesRepository.findAllUserClassesFromBlock({
            block_id: userBlock.block_id,
            user_id,
          });

        userClasses.map(async userClass => {
          await this.userClassesRepository.removeById(userClass.id);
        });
      });
    });
  }
}
