import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { ITrail } from '../entities/ITrail';

interface ITrailsRepository {
  create(data: ICreateTrailDTO): Promise<ITrail>;
  findById(trail_id: string): Promise<ITrail | undefined>;
}
export { ITrailsRepository };
