import { CreateBlockDTO } from '@modules/blocks/dtos/create-block-dto';
import { FindAllBlocksFromPlaylistDTO } from '@modules/blocks/dtos/find-all-blocks-from-playlist-dto';
import { FindByNameDTO } from '@modules/blocks/dtos/find-by-name-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IBlock } from '../entities/iblock';

type Relationship = {
  classes?: boolean;
};
interface IBlocksRepository {
  create(data: CreateBlockDTO): Promise<IBlock>;
  save(block: IBlock): Promise<IBlock>;
  findByName(
    data: FindByNameDTO,
    relationship?: Relationship,
  ): AsyncMaybe<IBlock>;
  findById(block_id: string, relationship?: Relationship): AsyncMaybe<IBlock>;
  destroyById(block_id: string): Promise<void>;
  findAllBlocks(): Promise<IBlock[]>;
  findAllBlocksFromPlaylist(
    data: FindAllBlocksFromPlaylistDTO,
  ): Promise<IBlock[]>;
}
export { IBlocksRepository, Relationship };