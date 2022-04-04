import { AppError } from '@shared/errors/app-error';
import { IStorageProvider } from '@shared/providers/storage-provider/models/storage-provider';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { UpdateTrailAvatarRequestDTO } from '../dtos/update-trail-avatar-request-dto';

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
  }: UpdateTrailAvatarRequestDTO): Promise<ITrail> {
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
