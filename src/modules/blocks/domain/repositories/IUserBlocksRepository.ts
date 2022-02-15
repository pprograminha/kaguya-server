import { ICreateUserBlockDTO } from '@modules/blocks/dtos/ICreateUserBlockDTO';
import { IFindAllUserBlocksFromPlaylistDTO } from '@modules/blocks/dtos/IFindAllUserBlocksFromPlaylistDTO';
import { IFindOneDTO } from '@modules/blocks/dtos/IFindOneDTO';
import { IUserBlock } from '../entities/IUserBlock';

interface IUserBlocksRepository {
  create(data: ICreateUserBlockDTO): Promise<IUserBlock>;
  save(userBlock: IUserBlock): Promise<void>;
  findById(user_block_id: string): Promise<IUserBlock | undefined>;
  findOne(data: IFindOneDTO): Promise<IUserBlock | undefined>;
  removeById(user_block_id: string): Promise<void>;
  findAllUserBlocksFromPlaylist(
    data: IFindAllUserBlocksFromPlaylistDTO,
  ): Promise<IUserBlock[]>;
}
export { IUserBlocksRepository };
