import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';

@injectable()
export class ListAllTrailsService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute(): Promise<ITrail[]> {
    const trails = await this.trailsRepository.findAllTrails();

    return trails;
  }
}
