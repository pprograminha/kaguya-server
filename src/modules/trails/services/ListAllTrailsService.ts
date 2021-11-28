import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { IPlaylistsRepository } from '@modules/playlists/domain/repositories/IPlaylistsRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
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

    @inject('PlaylistsRepository')
    private playlistsRepository: IPlaylistsRepository,
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

    let classesAmount = 0;

    trails = trails.map(trail => {
      trail.playlists.forEach(playlist =>
        playlist.blocks.forEach(block => {
          classesAmount += (block as IBlock & Count)._count.classes;
        }),
      );

      return {
        ...trail,
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
