import { ITrail } from '@modules/trails/domain/entities/ITrail';
import { ITrailsRepository } from '@modules/trails/domain/repositories/ITrailsRepository';
import { ICreateTrailDTO } from '@modules/trails/dtos/ICreateTrailDTO';
import { getRepository, Repository } from 'typeorm';
import { Trail } from '../entities/Trail';

export class TrailsRepository implements ITrailsRepository {
  private ormRepository: Repository<ITrail>;

  constructor() {
    this.ormRepository = getRepository(Trail);
  }

  async save(trail: ITrail): Promise<ITrail> {
    const trailSaved = await this.ormRepository.save(trail);

    return trailSaved;
  }

  async destroyById(trail_id: string): Promise<void> {
    await this.ormRepository.delete(trail_id);
  }

  async findAllTrails(): Promise<ITrail[]> {
    const trails = await this.ormRepository.find({
      relations: ['userTrails', 'userTrails.user'],
    });

    return trails;
  }

  async create(data: ICreateTrailDTO): Promise<ITrail> {
    const trail = this.ormRepository.create(data);

    await this.ormRepository.save(trail);

    return trail;
  }

  async findById(trail_id: string): Promise<ITrail | undefined> {
    const trail = await this.ormRepository.findOne({
      where: {
        id: trail_id,
      },
    });

    return trail;
  }
}
