import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type FindAllPlaylistsFromTrailDTO = {
  trail_id: string;
} & FiltersDTO;

export { FindAllPlaylistsFromTrailDTO };
