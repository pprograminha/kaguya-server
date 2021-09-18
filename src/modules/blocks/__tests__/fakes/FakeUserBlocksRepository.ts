import { IUserBlock } from '@modules/blocks/domain/entities/IUserBlock';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { ICreateUserBlockDTO } from '@modules/blocks/dtos/ICreateUserBlockDTO';
import { IFindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/IFindAllUserBlocksFromPlaylistDTO';
import { UserBlock } from '@modules/blocks/infra/typeorm/entities/UserBlock';

export class FakeUserBlocksRepository implements IUserBlocksRepository {
  private userBlocks: IUserBlock[] = [];

  async create(data: ICreateUserBlockDTO): Promise<IUserBlock> {
    const userBlock = new UserBlock();

    Object.assign(userBlock, data);

    this.userBlocks.push(userBlock);

    return userBlock;
  }

  async findById(user_block_id: string): Promise<IUserBlock | undefined> {
    const userBlockFinded = this.userBlocks.find(
      userBlock => userBlock.id === user_block_id,
    );

    return userBlockFinded;
  }

  async removeById(user_block_id: string): Promise<void> {
    const userBlockIndex = this.userBlocks.findIndex(
      userBlock => userBlock.id === user_block_id,
    );

    this.userBlocks.splice(userBlockIndex, 1);
  }

  async findAllUserBlocksFromPlaylist({
    playlist_id,
    user_id,
  }: IFindAllUserBlocksFromPlaylistDTO): Promise<IUserBlock[]> {
    const userBlocks = this.userBlocks.filter(
      userBlock =>
        userBlock.playlist_id === playlist_id && userBlock.user_id === user_id,
    );

    return userBlocks;
  }
}
