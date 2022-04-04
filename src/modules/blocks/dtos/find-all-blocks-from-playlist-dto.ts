import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type FindAllBlocksFromPlaylistDTO = {
  playlist_id: string;
} & FiltersDTO;

export { FindAllBlocksFromPlaylistDTO };
