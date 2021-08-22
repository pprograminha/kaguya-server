import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';

@injectable()
export class DestroyTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute(trail_id: string): Promise<ITrail> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail)
      throw new AppError(
        'It is not possible to delete this non-existent trail',
      );

    await this.trailsRepository.destroyById(trail_id);

    await this.storageProvider.deleteFile(trail.avatar);

    return trail;
  }
}
