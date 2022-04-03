import { CreateUserBlockDTO } from '@modules/blocks/dtos/create-user-block-dto';
import { FindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-user-blocks-from-playlist-dto';
import { FindOneDTO } from '@modules/blocks/dtos/find-one-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IUserBlock } from '../entities/iuser-block';

interface IUserBlocksRepository {
  create(data: CreateUserBlockDTO): Promise<IUserBlock>;
  save(userBlock: IUserBlock): Promise<void>;
  findById(user_block_id: string): AsyncMaybe<IUserBlock>;
  findOne(data: FindOneDTO): AsyncMaybe<IUserBlock>;
  removeById(user_block_id: string): Promise<void>;
  findAllUserBlocksFromPlaylist(
    data: FindAllUserBlocksFromPlaylistDTO,
  ): Promise<IUserBlock[]>;
}
export { IUserBlocksRepository };
