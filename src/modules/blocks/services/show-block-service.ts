import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { IBlock } from '../domain/entities/iblock';
import { IBlocksRepository } from '../domain/repositories/blocks-repository';
import { ShowBlockRequestDTO } from '../dtos/show-Block-request-dto';

@injectable()
class ShowBlockService {
  constructor(
    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute({
    block_id,
    block_slug,
    playlist_slug,
  }: ShowBlockRequestDTO): Promise<IBlock> {
    let block: Maybe<IBlock>;

    if (block_id) {
      block = await this.blocksRepository.findById(block_id, {
        lessons: true,
      });
    } else if (block_slug && playlist_slug) {
      block = await this.blocksRepository.findBySlug({
        slug: block_slug,
        playlist_slug,
      });
    }

    if (!block) {
      throw new AppError('Block does not exist', 12, 400);
    }

    return block;
  }
}

export { ShowBlockService };
