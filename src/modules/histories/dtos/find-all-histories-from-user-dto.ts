import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type FindAllHistoriesFromUserDTO = {
  user_id: string;
} & FiltersDTO;

export { FindAllHistoriesFromUserDTO };
