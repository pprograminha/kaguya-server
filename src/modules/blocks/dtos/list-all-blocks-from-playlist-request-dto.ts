import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListAllBlocksFromPlaylistRequestDTO = {
  user_id: string;
  playlist_id: string;
} & FiltersDTO;

export { ListAllBlocksFromPlaylistRequestDTO };
