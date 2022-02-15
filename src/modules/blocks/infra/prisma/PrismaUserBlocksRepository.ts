import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { ICreateUserBlockDTO } from '@modules/blocks/dtos/ICreateUserBlockDTO';
import { IFindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/IFindAllUserBlocksFromPlaylistDTO';
import { IFindOneDTO } from '@modules/blocks/dtos/IFindOneDTO';
import { prisma } from '@shared/infra/prisma/connection';
import { v4 as uuid } from 'uuid';

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

  async findOne({
    block_id,
    user_id,
  }: IFindOneDTO): Promise<IUserBlock | undefined> {
    const userBlock = await prisma.userBlock.findFirst({
      where: {
        block_id,
        user_id,
      },
    });

    return (userBlock as IUserBlock) || undefined;
  }

  async create({
    block_id,
    playlist_id,
    user_id,
  }: ICreateUserBlockDTO): Promise<IUserBlock> {
    const userBlock = await prisma.userBlock.create({
      data: {
        id: uuid(),
        block_id,
        playlist_id,
        user_id,
      },
    });

    return userBlock as IUserBlock;
  }

  async findById(user_block_id: string): Promise<IUserBlock | undefined> {
    const userBlock = await prisma.userBlock.findUnique({
      where: {
        id: user_block_id,
      },
    });

    return (userBlock as IUserBlock) || undefined;
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
  }: IFindAllUserBlocksFromPlaylistDTO): Promise<IUserBlock[]> {
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
