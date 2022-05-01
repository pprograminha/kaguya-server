import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { UpdateTrailRequestDTO } from '../dtos/update-trail-request-dto';

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
  }: UpdateTrailRequestDTO): Promise<ITrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail)
      throw new AppError(
        'The trail you want to update does not exist',
        12,
        400,
      );

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
