import crypto from 'crypto';
import { IBlock } from '@modules/blocks/domain/entities/iblock';
import {
  IBlocksRepository,
  Relationship,
} from '@modules/blocks/domain/repositories/iblocks-repository';
import { CreateBlockDTO } from '@modules/blocks/dtos/create-block-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import { FindByNameDTO } from '@modules/blocks/dtos/find-by-name-dto';

class PrismaBlocksRepository implements IBlocksRepository {
  async findByName(
    { name, playlist_name }: FindByNameDTO,
    relationship?: Relationship,
  ): AsyncMaybe<IBlock> {
    const block = await prisma.block.findFirst({
      where: {
        name: {
          equals: name.replace(/-/g, ' '),
          mode: 'insensitive',
        },
        playlist: {
          name: {
            equals: playlist_name.replace(/-/g, ' '),
            mode: 'insensitive',
          },
        },
      },
      ...(relationship && relationship.classes
        ? {
            include: {
              classes: true,
            },
          }
        : {}),
    });

    return block as IBlock;
  }

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

  async create({ name, playlist_id }: CreateBlockDTO): Promise<IBlock> {
    const block = await prisma.block.create({
      data: {
        id: crypto.randomUUID(),
        name,
        playlist_id,
      },
    });

    return block as IBlock;
  }

  async findById(
    block_id: string,
    relationship: Relationship,
  ): AsyncMaybe<IBlock> {
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

    return block as IBlock;
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
        user_blocks: {
          select: {
            block_id: true,
            user_id: true,
            progress: true,
          },
        },
        classes: {
          include: {
            user_classes: {
              select: {
                user_id: true,
                class_id: true,
                completed: true,
              },
            },
          },
        },
      },
    });
    return blocks as IBlock[];
  }
}
export { PrismaBlocksRepository };
