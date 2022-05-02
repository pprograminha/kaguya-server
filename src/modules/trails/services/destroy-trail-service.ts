import { AppError } from '@shared/errors/app-error';
import { IStorageProvider } from '@shared/providers/storage-provider/models/storage-provider';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';

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

    if (trail.avatar) {
      await this.storageProvider.deleteFile(trail.avatar);
    }

    return trail;
  }
}
