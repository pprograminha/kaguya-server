import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IBlocksRepository } from '../domain/repositories/iblocks-repository';

@injectable()
class DeleteBlockService {
  constructor(
    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute(block_id: string): Promise<void> {
    const block = await this.blocksRepository.findById(block_id);

    if (!block) {
      throw new AppError('Block does not exist', 403);
    }

    await this.blocksRepository.destroyById(block.id);
  }
}

export { DeleteBlockService };
