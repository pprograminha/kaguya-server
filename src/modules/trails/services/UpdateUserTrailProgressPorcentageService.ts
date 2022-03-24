import { IUserPlaylistsRepository } from '@modules/playlists/domain/repositories/IUserPlaylistsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IUserTrail } from '../domain/entities/IUserTrail';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { IUpdateUserTrailProgressPorcentageRequestDTO } from '../dtos/IUpdateUserTrailProgressPorcentageRequestDTO';

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
  }: IUpdateUserTrailProgressPorcentageRequestDTO): Promise<IUserTrail> {
    const userTrail = await this.userTrailsRepository.findUserTrail({
      trail_id,
      user_id,
    });

    if (!userTrail) throw new AppError('User trail not found', 400);

    const userPlaylists =
      await this.userPlaylistsRepository.findAllUserPlaylistsFromTrail({
        trail_id,
        user_id,
      });

    const progressTotal = userPlaylists.reduce(
      (previousValue, currentValue) => previousValue + currentValue.progress,
      0,
    );

    const userTrailProgressPercentage = progressTotal / userPlaylists.length;

    userTrail.progress = userTrailProgressPercentage;

    await this.userTrailsRepository.save(userTrail);

    return userTrail;
  }
}
