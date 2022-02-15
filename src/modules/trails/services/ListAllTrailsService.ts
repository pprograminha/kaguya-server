import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { inject, injectable } from 'tsyringe';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { ListAllTrailsRequestDTO } from '../dtos/ListAllTrailsDTO';

type Count = {
  _count: {
    classes: number;
    user_trails: number;
    playlists: number;
  };
};
@injectable()
export class ListAllTrailsService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,
  ) {}

  async execute({
    skip,
    take,
    order = 'asc',
    user_id,
    exclude_my_trails = false,
  }: ListAllTrailsRequestDTO): Promise<ITrail[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 403);

    let trails = await this.trailsRepository.findAllTrails({
      skip,
      take,
      order,
    });

    trails = trails.map(trail => {
      const classesAmount = trail.playlists.reduce(
        (_, playlist) =>
          playlist.blocks.reduce(
            (acc, block) => acc + (block as IBlock & Count)._count.classes,
            0,
          ),
        0,
      );

      let progress = 0;

      const userTrailFinded = trail.user_trails.find(
        userTrail =>
          userTrail.user_id === user_id && userTrail.trail_id === trail.id,
      );

      if (!userTrailFinded)
        throw new AppError('User trail does not exist', 403);

      if (userTrailFinded) {
        progress = userTrailFinded.progress;
      }

      return {
        ...trail,
        progress,
        user_trails: undefined,
        playlists: undefined,
        _count: {
          ...(trail as ITrail & Count)._count,
          user_trails: undefined,
          users: (trail as ITrail & Count)._count.user_trails,
          classes: classesAmount,
        },
      };
    }) as unknown as ITrail[];

    if (exclude_my_trails) {
      const userTrails = (
        await this.userTrailsRepository.findAllUserTrails(user.id)
      ).map(userTrail => userTrail.trail);

      userTrails.forEach(userTrail => {
        trails = trails.filter(trail => trail.id !== userTrail.id);
      });
    }

    return trails;
  }
}
