import { IUserBlock } from '@modules/blocks/domain/entities/iuser-block';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/iuser-blocks-repository';
import { CreateUserBlockDTO } from '@modules/blocks/dtos/create-user-block-dto';
import { FindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-user-blocks-from-playlist-dto';
import { FindOneDTO } from '@modules/blocks/dtos/find-one-dto';
import { UserBlock } from '@modules/blocks/entities/user-block';
import { AsyncMaybe } from '@shared/types/app';

export class InMemoryUserBlocksRepository implements IUserBlocksRepository {
  private userBlocks: IUserBlock[] = [];

  async save(userBlock: IUserBlock): Promise<void> {
    const userBlockIndex = this.userBlocks.findIndex(
      findedUserBlock => findedUserBlock.id === userBlock.id,
    );

    this.userBlocks[userBlockIndex] = userBlock;
  }

  async findOne({ block_id, user_id }: FindOneDTO): AsyncMaybe<IUserBlock> {
    const userBlockFinded = this.userBlocks.find(
      userBlock =>
        userBlock.block_id === block_id && userBlock.user_id === user_id,
    );

    return userBlockFinded;
  }

  async create(data: CreateUserBlockDTO): Promise<IUserBlock> {
    const userBlock = new UserBlock();

    Object.assign(userBlock, data);

    this.userBlocks.push(userBlock);

    return userBlock;
  }

  async findById(user_block_id: string): AsyncMaybe<IUserBlock> {
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
  }: FindAllUserBlocksFromPlaylistDTO): Promise<IUserBlock[]> {
    const userBlocks = this.userBlocks.filter(
      userBlock =>
        userBlock.playlist_id === playlist_id && userBlock.user_id === user_id,
    );

    return userBlocks;
  }
}
