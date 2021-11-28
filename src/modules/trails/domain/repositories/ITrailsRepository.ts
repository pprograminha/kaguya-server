import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { ITrail } from '../entities/ITrail';

export type FiltersDTO = {
  skip?: number;
  take?: number;
  order: 'asc' | 'desc';
};
interface ITrailsRepository {
  create(data: ICreateTrailDTO): Promise<ITrail>;
  save(trail: ITrail): Promise<ITrail>;
  findById(trail_id: string): Promise<ITrail | undefined>;
  destroyById(trail_id: string): Promise<void>;
  findAllTrails(filters?: FiltersDTO): Promise<ITrail[]>;
}
export { ITrailsRepository };
