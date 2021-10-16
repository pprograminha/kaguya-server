import { ICreateBlockDTO } from '@modules/blocks/dtos/ICreateBlockDTO';

import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { getRepository, Repository } from 'typeorm';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { Block } from '@modules/blocks/infra/typeorm/entities/Block';

export class BlocksRepository implements IBlocksRepository {
  private ormRepository: Repository<IBlock>;

  constructor() {
    this.ormRepository = getRepository(Block);
  }

  async save(block: IBlock): Promise<IBlock> {
    const blockSaved = await this.ormRepository.save(block);

    return blockSaved;
  }

  async findAllBlocks(): Promise<IBlock[]> {
    const blocks = await this.ormRepository.find();

    return blocks;
  }

  async create({ name, playlist_id }: ICreateBlockDTO): Promise<IBlock> {
    const block = this.ormRepository.create({
      name,
      playlist_id,
    });

    await this.ormRepository.save(block);

    return block;
  }

  async findById(user_block_id: string): Promise<IBlock | undefined> {
    const userblock = await this.ormRepository.findOne({
      where: {
        id: user_block_id,
      },
    });

    return userblock;
  }

  async destroyById(block_id: string): Promise<void> {
    await this.ormRepository.delete(block_id);
  }

  async findAllBlocksFromPlaylist(playlist_id: string): Promise<IBlock[]> {
    const blocks = await this.ormRepository.find({
      where: {
        playlist_id,
      },
      relations: ['classes'],
    });

    return blocks;
  }
}
