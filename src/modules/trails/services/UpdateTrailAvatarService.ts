import { AppError } from '@shared/errors/AppError';
import { IStorageProvider } from '@shared/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { IUpdateTrailAvatarRequestDTO } from '../dtos/IUpdateTrailAvatarRequestDTO';

@injectable()
export class UpdateTrailAvatarService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    trail_id,
    avatar,
  }: IUpdateTrailAvatarRequestDTO): Promise<ITrail> {
    if (!avatar) throw new AppError('Avatar field is required', 403);

    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) throw new AppError('Trail does not exist', 400);

    if (trail.avatar) {
      await this.storageProvider.deleteFile(trail.avatar);
    }

    trail.avatar = avatar;

    await this.trailsRepository.save(trail);

    await this.storageProvider.saveFile(trail.avatar);

    return trail;
  }
}
