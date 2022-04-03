import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { Maybe } from '@shared/types/app';
import { IBlock } from '../domain/entities/iblock';
import { IBlocksRepository } from '../domain/repositories/iblocks-repository';
import { ShowBlockRequestDTO } from '../dtos/show-Block-request-dto';

@injectable()
class ShowBlockService {
  constructor(
    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute({
    block_id,
    name,
    playlist_id,
  }: ShowBlockRequestDTO): Promise<IBlock> {
    let block: Maybe<IBlock>;

    if (block_id) {
      block = await this.blocksRepository.findById(block_id, {
        classes: true,
      });
    } else if (name && playlist_id) {
      block = await this.blocksRepository.findByName(name);
    }

    if (!block) {
      throw new AppError('Block does not exist', 403);
    }

    return block;
  }
}

export { ShowBlockService };
