import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';

type FindAllLessonsFromBlockDTO = {
  block_id: string;
} & FiltersDTO;

export { FindAllLessonsFromBlockDTO };
