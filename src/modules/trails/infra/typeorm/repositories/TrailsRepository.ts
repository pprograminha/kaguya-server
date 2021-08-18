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
