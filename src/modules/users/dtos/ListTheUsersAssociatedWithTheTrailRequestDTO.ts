import { FiltersDTO } from '../../trails/domain/repositories/ITrailsRepository';

type ListTheUsersAssociatedWithTheTrailRequestDTO = {
  trail_id: string;
} & FiltersDTO;

export { ListTheUsersAssociatedWithTheTrailRequestDTO };
