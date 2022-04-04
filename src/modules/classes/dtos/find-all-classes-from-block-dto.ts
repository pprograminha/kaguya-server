import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type FindAllClassesFromBlockDTO = {
  block_id: string;
} & FiltersDTO;

export { FindAllClassesFromBlockDTO };
