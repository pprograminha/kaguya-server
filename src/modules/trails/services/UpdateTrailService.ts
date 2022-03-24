import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { IUpdateTrailRequestDTO } from '../dtos/IUpdateTrailRequestDTO';

@injectable()
export class UpdateTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    trail_id,
    description,
    name,
  }: IUpdateTrailRequestDTO): Promise<ITrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail)
      throw new AppError('The trail you want to update does not exist');

    if (description) {
      trail.description = description;
    }

    if (name) {
      trail.name = name;
    }

    await this.trailsRepository.save(trail);

    return trail;
  }
}
