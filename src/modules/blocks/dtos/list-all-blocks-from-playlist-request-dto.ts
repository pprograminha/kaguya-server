import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListAllBlocksFromPlaylistRequestDTO = {
  user_id: string;
  playlist_id?: string;
  playlist_slug?: string;
  trail_slug?: string;
} & FiltersDTO;

export { ListAllBlocksFromPlaylistRequestDTO };
