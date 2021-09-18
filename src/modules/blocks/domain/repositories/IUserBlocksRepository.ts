import { ICreateUserBlockDTO } from '@modules/blocks/dtos/ICreateUserBlockDTO';
import { IFindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/IFindAllUserBlocksFromPlaylistDTO';
import { IUserBlock } from '../entities/IUserBlock';

interface IUserBlocksRepository {
  create(data: ICreateUserBlockDTO): Promise<IUserBlock>;
  findById(user_block_id: string): Promise<IUserBlock | undefined>;
  removeById(user_block_id: string): Promise<void>;
  findAllUserBlocksFromPlaylist(
    data: IFindAllUserBlocksFromPlaylistDTO,
  ): Promise<IUserBlock[]>;
}
export { IUserBlocksRepository };
