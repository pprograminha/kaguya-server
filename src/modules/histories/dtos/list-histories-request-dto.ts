import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListHistoriesRequestDTO = {
  user_id?: string;
} & FiltersDTO;

export { ListHistoriesRequestDTO };
