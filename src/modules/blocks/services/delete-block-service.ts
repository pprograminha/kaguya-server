import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IBlocksRepository } from '../domain/repositories/blocks-repository';

@injectable()
class DeleteBlockService {
  constructor(
    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute(block_id: string): Promise<void> {
    const block = await this.blocksRepository.findById(block_id);

    if (!block) {
      throw new AppError('Block does not exist', 12, 400);
    }

    await this.blocksRepository.destroyById(block.id);
  }
}

export { DeleteBlockService };
