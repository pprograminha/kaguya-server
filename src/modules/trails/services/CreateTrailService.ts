import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { ICreateTrailRequestDTO } from '../dtos/ICreateTrailRequestDTO';

@injectable()
export class CreateTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    description,
    name,
  }: ICreateTrailRequestDTO): Promise<ITrail> {
    const trail = await this.trailsRepository.create({
      description,
      name,
    });

    return trail;
  }
}
