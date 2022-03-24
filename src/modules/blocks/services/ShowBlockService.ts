import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IBlock } from '../domain/entities/IBlock';
import { IBlocksRepository } from '../domain/repositories/IBlocksRepository';

@injectable()
class ShowBlockService {
  constructor(
    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute(block_id: string): Promise<IBlock> {
    const block = await this.blocksRepository.findById(block_id, {
      classes: true,
    });

    if (!block) {
      throw new AppError('Block does not exist', 403);
    }

    return block;
  }
}

export { ShowBlockService };
