import { FiltersDTO } from '../domain/repositories/trails-repository';

type FindAllUserTrailsDTO = {
  user_id: string;
  enabled: boolean;
} & FiltersDTO;

export { FindAllUserTrailsDTO };
