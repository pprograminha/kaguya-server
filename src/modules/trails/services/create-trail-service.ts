import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { CreateTrailRequestDTO } from '../dtos/create-trail-request-dto';

@injectable()
export class CreateTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({ description, name }: CreateTrailRequestDTO): Promise<ITrail> {
    const trail = await this.trailsRepository.create({
      description,
      name,
    });

    return trail;
  }
}
