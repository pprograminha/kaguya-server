import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { Trail } from '../../entities/Trail';

export class FakeTrailsRepository implements ITrailsRepository {
  private trails: ITrail[] = [];

  async create(data: ICreateTrailDTO): Promise<ITrail> {
    const trail = new Trail();

    Object.assign(trail, data);

    this.trails.push(trail);

    return trail;
  }

  async findById(trail_id: string): Promise<ITrail | undefined> {
    const trail = this.trails.find(trailFind => trailFind.id === trail_id);

    return trail;
  }
}
