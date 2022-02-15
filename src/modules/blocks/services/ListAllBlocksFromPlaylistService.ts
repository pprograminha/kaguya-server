import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBlock } from '../domain/entities/IBlock';
import { IBlocksRepository } from '../domain/repositories/IBlocksRepository';
import { IListAllBlocksFromPlaylistRequestDTO } from '../dtos/IListAllBlocksFromPlaylistRequestDTO';

@injectable()
class ListAllBlocksFromPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute({
    playlist_id,
    user_id,
  }: IListAllBlocksFromPlaylistRequestDTO): Promise<IBlock[]> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist');
    }

    let blocks = await this.blocksRepository.findAllBlocksFromPlaylist(
      playlist.id,
    );

    blocks = blocks.map(block => {
      const userBlock = block.user_blocks.find(
        user_block =>
          user_block.block_id === block.id && user_block.user_id === user_id,
      );
      let progress = 0;

      if (userBlock) {
        progress = userBlock.progress;
      }

      const classes = block.classes.map(_class => {
        const completed = _class.user_classes.some(
          user_class =>
            user_class.user_id === user_id &&
            user_class.class_id === _class.id &&
            user_class.completed,
        );
        return {
          ..._class,
          user_classes: undefined,
          completed,
        };
      });

      return {
        ...block,
        classes,
        user_blocks: undefined,
        progress,
      } as unknown as IBlock;
    });

    return blocks;
  }
}

export { ListAllBlocksFromPlaylistService };
