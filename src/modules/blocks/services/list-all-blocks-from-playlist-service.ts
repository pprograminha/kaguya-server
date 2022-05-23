import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/playlists-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { IBlock } from '../domain/entities/iblock';
import { IBlocksRepository } from '../domain/repositories/blocks-repository';
import { ListAllBlocksFromPlaylistRequestDTO } from '../dtos/list-all-blocks-from-playlist-request-dto';

@injectable()
class ListAllBlocksFromPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    playlist_id,
    user_id,
    order,
    skip,
    take,
  }: ListAllBlocksFromPlaylistRequestDTO): Promise<IBlock[]> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist', 12, 400);
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    let blocks = await this.blocksRepository.findAllBlocksFromPlaylist({
      order,
      skip,
      take,
      playlist_id: playlist.id,
    });

    blocks = blocks.map(block => {
      const userBlock = block.user_blocks.find(
        user_block =>
          user_block.block_id === block.id && user_block.user_id === user_id,
      );

      const lessons = block.lessons.map(_lesson => {
        const completed = _lesson.user_lessons.some(
          user_lesson =>
            user_lesson.user_id === user_id &&
            user_lesson.lesson_id === _lesson.id &&
            user_lesson.completed,
        );
        return {
          ..._lesson,
          user_lessons: undefined,
          completed,
        };
      });

      return {
        ...block,
        lessons,
        user_blocks: undefined,
        user_block: userBlock
          ? {
              progress: userBlock.progress,
            }
          : {},
      } as unknown as IBlock;
    });

    return blocks;
  }
}

export { ListAllBlocksFromPlaylistService };
