import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBlock } from '../domain/entities/IBlock';
import { IBlocksRepository } from '../domain/repositories/IBlocksRepository';

@injectable()
class ListAllBlocksFromPlaylistService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute(playlist_id: string): Promise<IBlock[]> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist');
    }

    const blocks = await this.blocksRepository.findAllBlocksFromPlaylist(
      playlist.id,
    );

    return blocks;
  }
}

export { ListAllBlocksFromPlaylistService };
