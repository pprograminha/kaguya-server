import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type ListLessonsRequestDTO = {
  user_id: string;
  block_id?: string;
} & FiltersDTO;
export { ListLessonsRequestDTO };
