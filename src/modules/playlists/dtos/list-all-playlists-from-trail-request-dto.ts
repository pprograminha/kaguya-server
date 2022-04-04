import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListAllPlaylistsFromTrailRequestDTO = {
  trail_id: string;
  user_id: string;
} & FiltersDTO;

export { ListAllPlaylistsFromTrailRequestDTO };
