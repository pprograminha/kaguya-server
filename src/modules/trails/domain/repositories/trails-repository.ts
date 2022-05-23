import { CreateTrailDTO } from '@modules/trails/dtos/create-trail-dto';
import { FindAllTrailsDTO } from '@modules/trails/dtos/find-all-trails-dto';
import { AsyncMaybe } from '@shared/types/app';
import { ITrail } from '../entities/itrail';

export type FiltersDTO = {
  skip?: number;
  take?: number;
  order?: 'asc' | 'desc';
};
interface ITrailsRepository {
  create(data: CreateTrailDTO): Promise<ITrail>;
  save(trail: ITrail): Promise<ITrail>;
  findById(trail_id: string, relationship?: boolean): AsyncMaybe<ITrail>;
  findByName(name: string): AsyncMaybe<ITrail>;
  findBySlug(slug: string): AsyncMaybe<ITrail>;
  destroyById(trail_id: string): Promise<void>;
  findAllTrails(data?: FindAllTrailsDTO): Promise<ITrail[]>;
}
export { ITrailsRepository };
