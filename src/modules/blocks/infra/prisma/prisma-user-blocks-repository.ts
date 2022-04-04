import { IUserBlock } from '@modules/blocks/domain/entities/iuser-block';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/user-blocks-repository';
import { CreateUserBlockDTO } from '@modules/blocks/dtos/create-user-block-dto';
import { FindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-user-blocks-from-playlist-dto';
import { FindOneDTO } from '@modules/blocks/dtos/find-one-dto';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaUserBlocksRepository implements IUserBlocksRepository {
  async save({ id, progress }: IUserBlock): Promise<void> {
    await prisma.userBlock.update({
      data: {
        progress,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });
  }

  async findOne({ block_id, user_id }: FindOneDTO): AsyncMaybe<IUserBlock> {
    const userBlock = await prisma.userBlock.findFirst({
      where: {
        block_id,
        user_id,
      },
    });

    return userBlock as IUserBlock;
  }

  async create({
    block_id,
    playlist_id,
    user_id,
  }: CreateUserBlockDTO): Promise<IUserBlock> {
    const userBlock = await prisma.userBlock.create({
      data: {
        id: crypto.randomUUID(),
        block_id,
        playlist_id,
        user_id,
      },
    });

    return userBlock as IUserBlock;
  }

  async findById(user_block_id: string): AsyncMaybe<IUserBlock> {
    const userBlock = await prisma.userBlock.findUnique({
      where: {
        id: user_block_id,
      },
    });

    return userBlock as IUserBlock;
  }

  async removeById(user_block_id: string): Promise<void> {
    await prisma.userBlock.delete({
      where: {
        id: user_block_id,
      },
    });
  }

  async findAllUserBlocksFromPlaylist({
    playlist_id,
    user_id,
  }: FindAllUserBlocksFromPlaylistDTO): Promise<IUserBlock[]> {
    const userBlocks = await prisma.userBlock.findMany({
      where: {
        playlist_id,
        user_id,
      },
    });

    return userBlocks as IUserBlock[];
  }
}
export { PrismaUserBlocksRepository };
