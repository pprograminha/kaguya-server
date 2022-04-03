import { FiltersDTO } from '../domain/repositories/ITrailsRepository';

type FindAllTrailsDTO = {
  except_user_id?: string;
} & FiltersDTO;

export { FindAllTrailsDTO };
