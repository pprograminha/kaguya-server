import { FiltersDTO } from '../domain/repositories/trails-repository';

type FindAllTrailsDTO = {
  except_user_id?: string;
} & FiltersDTO;

export { FindAllTrailsDTO };
