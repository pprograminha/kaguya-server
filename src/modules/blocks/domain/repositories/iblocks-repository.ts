import { CreateBlockDTO } from '@modules/blocks/dtos/create-block-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IBlock } from '../entities/iblock';

type Relationship = {
  classes?: boolean;
};
interface IBlocksRepository {
  create(data: CreateBlockDTO): Promise<IBlock>;
  save(block: IBlock): Promise<IBlock>;
  findByName(name: string, relationship?: Relationship): AsyncMaybe<IBlock>;
  findById(block_id: string, relationship?: Relationship): AsyncMaybe<IBlock>;
  destroyById(block_id: string): Promise<void>;
  findAllBlocks(): Promise<IBlock[]>;
  findAllBlocksFromPlaylist(playlist_id: string): Promise<IBlock[]>;
}
export { IBlocksRepository, Relationship };
