import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { ListAllTrailsRequestDTO } from '../dtos/list-all-trails-dto';

type Count = {
  _count: {
    lessons: number;
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
  ) {}

  async execute({
    skip,
    take,
    order = 'asc',
    user_id,
    exclude_my_trails = false,
  }: ListAllTrailsRequestDTO): Promise<ITrail[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 401);

    let trails = await this.trailsRepository.findAllTrails({
      ...(exclude_my_trails
        ? {
            except_user_id: user_id,
          }
        : {}),
      skip,
      take,
      order,
    });

    trails = trails.map(trail => {
      const lessonsAmount = trail.playlists.reduce(
        (_, playlist) =>
          playlist.blocks.reduce(
            (acc, block) => acc + (block as IBlock & Count)._count.lessons,
            0,
          ),
        0,
      );

      return {
        ...trail,
        user_trails: undefined,
        playlists: undefined,
        _count: {
          ...(trail as ITrail & Count)._count,
          user_trails: undefined,
          users: (trail as ITrail & Count)._count.user_trails,
          lessons: lessonsAmount,
        },
      };
    }) as unknown as ITrail[];

    return trails;
  }
}
