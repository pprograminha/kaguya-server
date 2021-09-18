import { ICreateBlockDTO } from '@modules/blocks/dtos/ICreateBlockDTO';
import { IBlock } from '../entities/IBlock';

interface IBlocksRepository {
  create(data: ICreateBlockDTO): Promise<IBlock>;
  save(block: IBlock): Promise<IBlock>;
  findById(block_id: string): Promise<IBlock | undefined>;
  destroyById(block_id: string): Promise<void>;
  findAllBlocks(): Promise<IBlock[]>;
  findAllBlocksFromPlaylist(playlist_id: string): Promise<IBlock[]>;
}
export { IBlocksRepository };
