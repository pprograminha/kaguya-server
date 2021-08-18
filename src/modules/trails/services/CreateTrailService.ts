import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { ICreateTrailRequestDTO } from '../dtos/ICreateTrailRequestDTO';

@injectable()
export class CreateTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    avatar,
    description,
    name,
  }: ICreateTrailRequestDTO): Promise<ITrail> {
    if (!avatar) throw new AppError('Avatar field is required', 403);

    const trail = await this.trailsRepository.create({
      avatar,
      description,
      name,
    });

    await this.storageProvider.saveFile(avatar);

    return trail;
  }
}
