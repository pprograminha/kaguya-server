import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IBlock } from '../domain/entities/iblock';
import { IBlocksRepository } from '../domain/repositories/blocks-repository';
import { IUserBlocksRepository } from '../domain/repositories/user-blocks-repository';
import { CreateBlockRequestDTO } from '../dtos/create-block-request-dto';

@injectable()
class CreateBlockService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBlocksRepository')
    private userBlocksRepository: IUserBlocksRepository,
  ) {}

  async execute({ playlist_id, name }: CreateBlockRequestDTO): Promise<IBlock> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist');
    }

    const block = await this.blocksRepository.create({
      name,
      playlist_id,
    });

    const users =
      await this.usersRepository.findAllUsersAssociatedWithThePlaylist({
        playlist_id: playlist.id,
      });

    const userBlockPromises = users.map(async user => {
      await this.userBlocksRepository.create({
        user_id: user.id,
        block_id: block.id,
        playlist_id: playlist.id,
      });
    });

    await Promise.all(userBlockPromises);

    return block;
  }
}

export { CreateBlockService };
