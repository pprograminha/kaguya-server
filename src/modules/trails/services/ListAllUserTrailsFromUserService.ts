import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/ITrail';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { ListAllUserTrailsFromUserRequestDTO } from '../dtos/ListAllUserTrailsFromUserRequestDTO';

@injectable()
export class ListAllUserTrailsFromUserService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,
  ) {}

  async execute({
    user_id,
    user = false,
  }: ListAllUserTrailsFromUserRequestDTO): Promise<ITrail[]> {
    const userTrails = await this.userTrailsRepository.findAllUserTrails(
      user_id,
      user
        ? {
            user: true,
          }
        : undefined,
    );

    const trails = userTrails.map(
      ({ enabled, trail, progress, user: _user }) => ({
        ...trail,
        user: _user,
        user_trail: {
          progress,
          enabled,
        },
      }),
    );

    return trails;
  }
}
