import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBlock } from '../domain/entities/IBlock';
import { IBlocksRepository } from '../domain/repositories/IBlocksRepository';
import { ICreateBlockRequestDTO } from '../dtos/ICreateBlockRequestDTO';

@injectable()
class CreateBlockService {
  constructor(
    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute({
    playlist_id,
    name,
  }: ICreateBlockRequestDTO): Promise<IBlock> {
    const playlist = await this.playlistsRepository.findById(playlist_id);

    if (!playlist) {
      throw new AppError('This playlist does not exist');
    }

    const block = await this.blocksRepository.create({
      name,
      playlist_id,
    });

    return block;
  }
}

export { CreateBlockService };
