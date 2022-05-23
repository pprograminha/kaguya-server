import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { CreateTrailRequestDTO } from '../dtos/create-trail-request-dto';

@injectable()
export class CreateTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    description,
    name,
    slug,
  }: CreateTrailRequestDTO): Promise<ITrail> {
    const checkNameAlreadyExists = await this.trailsRepository.findByName(name);

    if (checkNameAlreadyExists) {
      throw new AppError('This name already exists', 23);
    }

    const checkSlugAlreadyExists = await this.trailsRepository.findBySlug(slug);

    if (checkSlugAlreadyExists) {
      throw new AppError('Slug already exists', 24, 400);
    }

    const trail = await this.trailsRepository.create({
      description,
      slug,
      name,
    });

    return trail;
  }
}
