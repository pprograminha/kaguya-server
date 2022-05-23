import crypto from 'crypto';
import { IBlock } from '@modules/blocks/domain/entities/iblock';
import {
  IBlocksRepository,
  Relationship,
} from '@modules/blocks/domain/repositories/blocks-repository';
import { CreateBlockDTO } from '@modules/blocks/dtos/create-block-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import { FindByNameDTO } from '@modules/blocks/dtos/find-by-name-dto';
import { FindAllBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-blocks-from-playlist-dto';
import { FindBySlugDTO } from '@modules/blocks/dtos/find-by-slug-dto';

class PrismaBlocksRepository implements IBlocksRepository {
  async findBySlug(
    { playlist_slug, slug }: FindBySlugDTO,
    relationship?: Relationship,
  ): AsyncMaybe<IBlock> {
    const block = await prisma.block.findFirst({
      where: {
        slug,
        playlist: {
          slug: playlist_slug,
        },
      },
      ...(relationship && relationship.lessons
        ? {
            include: {
              lessons: true,
            },
          }
        : {}),
    });

    return block as IBlock;
  }

  async findByName(
    { name, playlist_name }: FindByNameDTO,
    relationship?: Relationship,
  ): AsyncMaybe<IBlock> {
    const block = await prisma.block.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        playlist: {
          name: {
            equals: playlist_name,
            mode: 'insensitive',
          },
        },
      },
      ...(relationship && relationship.lessons
        ? {
            include: {
              lessons: true,
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

  async create(data: CreateBlockDTO): Promise<IBlock> {
    const block = await prisma.block.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
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
      ...(relationship && relationship.lessons
        ? {
            include: {
              lessons: true,
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

  async findAllBlocksFromPlaylist({
    playlist_id,
    order,
    skip,
    take,
  }: FindAllBlocksFromPlaylistDTO): Promise<IBlock[]> {
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
        lessons: {
          include: {
            user_lessons: {
              select: {
                user_id: true,
                lesson_id: true,
                completed: true,
              },
            },
          },
        },
      },
      ...(order
        ? {
            orderBy: {
              created_at: order,
            },
          }
        : {}),
      skip,
      take,
    });
    return blocks as unknown as IBlock[];
  }
}
export { PrismaBlocksRepository };
