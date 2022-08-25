import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUserPlaylist } from '../domain/entities/iuser-playlist';
import { IUserPlaylistsRepository } from '../domain/repositories/user-playlists-repository';
import { UpdateUserPlaylistProgressPorcentageRequestDTO } from '../dtos/update-user-playlist-progress-porcentage-request-dto';

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

    if (!userPlaylist)
      throw new AppError('This playlist does not exist', 12, 400);

    const playlistProgress =
      await this.userBlocksRepository.findPlaylistProgressByBlocks({
        playlist_id,
        user_id,
      });

    userPlaylist.progress = playlistProgress;

    await this.userPlaylistsRepository.save(userPlaylist);

    return userPlaylist;
  }
}
