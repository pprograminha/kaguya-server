import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/iuser-blocks-repository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';
import { UpdateUserPlaylistProgressPorcentageRequestDTO } from '../dtos/update-user-playlist-progress-porcentage-request-dto';
import { IUserPlaylistsRepository } from '../domain/repositories/iuser-playlists-repository';

@injectable()
export class UpdateUserPlaylistProgressPorcentageService {
  constructor(
    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,
  ) {}

  async execute({
    playlist_id,
    user_id,
  }: UpdateUserPlaylistProgressPorcentageRequestDTO): Promise<IUserPlaylist> {
    const userPlaylist = await this.userPlaylistsRepository.findOne({
      playlist_id,
      user_id,
    });

    if (!userPlaylist) throw new AppError('This playlist does not exist', 403);

    const userBlocks =
      await this.userBlocksRepository.findAllUserBlocksFromPlaylist({
        playlist_id,
        user_id,
      });

    const progressTotal = userBlocks.reduce(
      (previousValue, currentValue) => previousValue + currentValue.progress,
      0,
    );

    const userPlaylistProgressPercentage = progressTotal / userBlocks.length;

    userPlaylist.progress = userPlaylistProgressPercentage;

    await this.userPlaylistsRepository.save(userPlaylist);

    return userPlaylist;
  }
}
