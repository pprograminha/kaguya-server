import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { ITrail } from '../entities/ITrail';

interface ITrailsRepository {
  create(data: ICreateTrailDTO): Promise<ITrail>;
  save(trail: ITrail): Promise<ITrail>;
  findById(trail_id: string): Promise<ITrail | undefined>;
  destroyById(trail_id: string): Promise<void>;
  findAllTrails(): Promise<ITrail[]>;
}
export { ITrailsRepository };
