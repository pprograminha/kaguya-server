import { FiltersDTO } from '../../trails/domain/repositories/trails-repository';

type ListTheUsersAssociatedWithTheTrailRequestDTO = {
  trail_id: string;
} & FiltersDTO;

export { ListTheUsersAssociatedWithTheTrailRequestDTO };
