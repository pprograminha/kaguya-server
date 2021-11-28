import { v4 as uuid } from 'uuid';
import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import {
  IBlocksRepository,
  Relationship,
} from '@modules/blocks/domain/repositories/IBlocksRepository';
import { ICreateBlockDTO } from '@modules/blocks/dtos/ICreateBlockDTO';
import { prisma } from '@shared/infra/prisma/connection';

class PrismaBlocksRepository implements IBlocksRepository {
  async save({ id, name, playlist_id }: IBlock): Promise<IBlock> {
    const block = await prisma.block.update({
      data: {
        name,
        playlist_id,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });
    return block as IBlock;
  }

  async findAllBlocks(): Promise<IBlock[]> {
    const blocks = await prisma.block.findMany();

    return blocks as IBlock[];
  }

  async create({ name, playlist_id }: ICreateBlockDTO): Promise<IBlock> {
    const block = await prisma.block.create({
      data: {
        id: uuid(),
        name,
        playlist_id,
      },
    });

    return block as IBlock;
  }

  async findById(
    block_id: string,
    relationship: Relationship,
  ): Promise<IBlock | undefined> {
    const block = await prisma.block.findUnique({
      where: {
        id: block_id,
      },
      ...(relationship && relationship.classes
        ? {
            include: {
              classes: true,
            },
          }
        : {}),
    });

    return (block || undefined) as IBlock;
  }

  async destroyById(block_id: string): Promise<void> {
    await prisma.block.delete({
      where: {
        id: block_id,
      },
    });
  }

  async findAllBlocksFromPlaylist(playlist_id: string): Promise<IBlock[]> {
    const blocks = await prisma.block.findMany({
      where: {
        playlist_id,
      },
      include: {
        classes: true,
      },
    });
    return blocks as IBlock[];
  }
}
export { PrismaBlocksRepository };
