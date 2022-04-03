import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
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
    get_user_trail = false,
    exclude_my_trails = false,
  }: ListAllTrailsRequestDTO): Promise<ITrail[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 403);

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
      const classesAmount = trail.playlists.reduce(
        (_, playlist) =>
          playlist.blocks.reduce(
            (acc, block) => acc + (block as IBlock & Count)._count.classes,
            0,
          ),
        0,
      );

      let progress = 0;

      const findedUserTrail = trail.user_trails.find(
        userTrail =>
          userTrail.user_id === user_id && userTrail.trail_id === trail.id,
      );

      if (findedUserTrail) {
        progress = findedUserTrail.progress;
      }

      return {
        ...trail,
        ...(get_user_trail
          ? {
              user_trail: findedUserTrail
                ? {
                    progress,
                    enabled: findedUserTrail?.enabled,
                  }
                : null,
            }
          : {}),
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

    return trails;
  }
}
