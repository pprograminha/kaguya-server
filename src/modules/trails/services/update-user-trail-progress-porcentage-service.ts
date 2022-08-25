import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/user-playlists-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUserTrail } from '../domain/entities/iuser-trail';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { UpdateUserTrailProgressPorcentageRequestDTO } from '../dtos/update-user-trail-progress-porcentage-request-dto';

@injectable()
export class UpdateUserTrailProgressPorcentageService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,

    @inject('UserPlaylistsRepository')
    private userPlaylistsRepository: IUserPlaylistsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
  }: UpdateUserTrailProgressPorcentageRequestDTO): Promise<IUserTrail> {
    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id,
      user_id,
    });

    if (!userTrail) throw new AppError('User trail does not exist', 12, 400);

    const trailProgress =
      await this.userPlaylistsRepository.findTrailProgressByPlaylists({
        trail_id,
        user_id,
      });

    userTrail.progress = trailProgress;

    await this.userTrailsRepository.save(userTrail);

    return userTrail;
  }
}
