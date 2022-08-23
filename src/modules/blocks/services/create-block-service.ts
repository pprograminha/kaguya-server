import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
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

  async execute({
    playlist_id,
    name,
    slug,
  }: CreateBlockRequestDTO): Promise<IBlock> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist', 12);
    }

    const checkNameAlreadyExists = await this.blocksRepository.findByName({
      name,
      playlist_name: playlist.name,
    });

    if (checkNameAlreadyExists) {
      throw new AppError('This name already exists', 23);
    }

    const checkSlugAlreadyExists = await this.blocksRepository.findBySlug({
      slug,
      playlist_slug: playlist.slug,
    });

    if (checkSlugAlreadyExists) {
      throw new AppError('This slug already exists', 24);
    }

    const block = await this.blocksRepository.create({
      name,
      slug,
      playlist_id,
    });

    const users =
      await this.usersRepository.findAllUsersAssociatedWithThePlaylist({
        playlist_id: playlist.id,
      });

    const userBlockPromises = users.map(async user => {
      const userBlock = await this.userBlocksRepository.findUserBlock({
        user_id: user.id,
        block_id: block.id,
        playlist_id: playlist.id,
      });

      if (!userBlock)
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
