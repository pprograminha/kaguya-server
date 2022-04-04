import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListClassesRequestDTO = {
  user_id: string;
  block_id?: string;
} & FiltersDTO;
export { ListClassesRequestDTO };
