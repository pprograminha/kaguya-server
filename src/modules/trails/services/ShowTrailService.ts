import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { ShowTrailRequestDTO } from '../dtos/ShowTrailRequestDTO';

@injectable()
class ShowTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({ trail_id }: ShowTrailRequestDTO): Promise<ITrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 403);
    }

    return trail;
  }
}

export { ShowTrailService };
