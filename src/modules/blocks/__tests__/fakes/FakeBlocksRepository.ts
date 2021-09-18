import { Block } from '@modules/blocks/infra/typeorm/entities/Block';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { ICreateBlockDTO } from '@modules/blocks/dtos/ICreateBlockDTO';

class FakeBlocksRepository implements IBlocksRepository {
  private blocks: IBlock[] = [];

  async save(block: IBlock): Promise<IBlock> {
    const indexFinded = this.blocks.findIndex(
      findBlock => findBlock.id === block.id,
    );

    this.blocks[indexFinded] = block;

    return block;
  }

  async findById(block_id: string): Promise<IBlock | undefined> {
    const blockFinded = this.blocks.find(block => block.id === block_id);

    return blockFinded;
  }

  async destroyById(block_id: string): Promise<void> {
    const blocks = this.blocks.filter(block => block.id !== block_id);

    this.blocks = blocks;
  }

  async findAllBlocks(): Promise<IBlock[]> {
    return this.blocks;
  }

  async findAllBlocksFromPlaylist(playlist_id: string): Promise<IBlock[]> {
    return this.blocks.filter(block => block.playlist_id === playlist_id);
  }

  async create(data: ICreateBlockDTO): Promise<IBlock> {
    const block = new Block();

    Object.assign(block, data);

    this.blocks.push(block);

    return block;
  }
}

export { FakeBlocksRepository };
