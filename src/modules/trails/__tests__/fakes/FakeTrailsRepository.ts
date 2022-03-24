import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { Trail } from '@modules/trails/entities/Trail';

export class FakeTrailsRepository implements ITrailsRepository {
  private trails: ITrail[] = [];

  async findByName(name: string): Promise<ITrail | undefined> {
    const trail = this.trails.find(trailFind => trailFind.name === name);

    return trail;
  }

  async save(trail: ITrail): Promise<ITrail> {
    const trailIndexFinded = this.trails.findIndex(
      findTrail => findTrail.id === trail.id,
    );

    this.trails[trailIndexFinded] = trail;

    return trail;
  }

  async destroyById(trail_id: string): Promise<void> {
    const trails = this.trails.filter(trail => trail.id !== trail_id);

    this.trails = trails;
  }

  async findAllTrails(): Promise<ITrail[]> {
    return this.trails;
  }

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
