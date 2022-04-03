import { FindAllTrailsDTO } from '@modules/trails/dtos/FindAllTrailsDTO';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { AsyncMaybe } from '@shared/types/app';
import { ITrail } from '../entities/ITrail';

export type FiltersDTO = {
  skip?: number;
  take?: number;
  order?: 'asc' | 'desc';
};
interface ITrailsRepository {
  create(data: ICreateTrailDTO): Promise<ITrail>;
  save(trail: ITrail): Promise<ITrail>;
  findById(trail_id: string, relationship?: boolean): AsyncMaybe<ITrail>;
  findByName(name: string): AsyncMaybe<ITrail>;
  destroyById(trail_id: string): Promise<void>;
  findAllTrails(data?: FindAllTrailsDTO): Promise<ITrail[]>;
}
export { ITrailsRepository };
