import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type CreateUserPlaylistsRequestDTO = {
  trail_id: string;
  user_id: string;
} & FiltersDTO;
export { CreateUserPlaylistsRequestDTO };
