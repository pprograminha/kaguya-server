import { ITrail } from '@modules/trails/domain/entities/itrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/trails-repository';
import { CreateTrailDTO } from '@modules/trails/dtos/create-trail-dto';
import { Trail } from '@modules/trails/entities/trail';
import { AsyncMaybe } from '@shared/types/app';

export class InMemoryTrailsRepository implements ITrailsRepository {
  private trails: ITrail[] = [];

  async findByName(name: string): AsyncMaybe<ITrail> {
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

  async create(data: CreateTrailDTO): Promise<ITrail> {
    const trail = new Trail();

    Object.assign(trail, data);

    this.trails.push(trail);

    return trail;
  }

  async findById(trail_id: string): AsyncMaybe<ITrail> {
    const trail = this.trails.find(trailFind => trailFind.id === trail_id);

    return trail;
  }
}
