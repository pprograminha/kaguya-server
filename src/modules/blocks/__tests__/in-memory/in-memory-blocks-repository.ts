import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { CreateBlockDTO } from '@modules/blocks/dtos/create-block-dto';
import { FindAllBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-blocks-from-playlist-dto';
import { FindByNameDTO } from '@modules/blocks/dtos/find-by-name-dto';
import { FindBySlugDTO } from '@modules/blocks/dtos/find-by-slug-dto';
import { Block } from '@modules/blocks/entities/block';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryBlocksRepository implements IBlocksRepository {
  private blocks: IBlock[] = [];

  async findBySlug({ slug }: FindBySlugDTO): AsyncMaybe<IBlock> {
    const findedBlock = this.blocks.find(block => block.slug === slug);

    return findedBlock;
  }

  async findByName({ name }: FindByNameDTO): AsyncMaybe<IBlock> {
    const findedBlock = this.blocks.find(block => block.name === name);

    return findedBlock;
  }

  async findAllBlocksFromPlaylist({
    playlist_id,
  }: FindAllBlocksFromPlaylistDTO): Promise<IBlock[]> {
    const blocks = this.blocks.filter(
      block => block.playlist_id === playlist_id,
    );

    return blocks;
  }

  async save(block: IBlock): Promise<IBlock> {
    const blockIndex = this.blocks.findIndex(
      findBlock => findBlock.id === block.id,
    );

    this.blocks[blockIndex] = block;

    return block;
  }

  async findById(block_id: string): AsyncMaybe<IBlock> {
    const findedBlock = this.blocks.find(block => block.id === block_id);

    return findedBlock;
  }

  async destroyById(block_id: string): Promise<void> {
    const blocks = this.blocks.filter(block => block.id !== block_id);

    this.blocks = blocks;
  }

  async findAllBlocks(): Promise<IBlock[]> {
    return this.blocks;
  }

  async create(data: CreateBlockDTO): Promise<IBlock> {
    const block = new Block();

    Object.assign(block, data);

    this.blocks.push(block);

    return block;
  }
}

export { InMemoryBlocksRepository };
