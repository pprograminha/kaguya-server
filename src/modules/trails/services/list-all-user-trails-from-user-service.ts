import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { IUser } from '@modules/users/domain/entities/iuser';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/itrail';
import { IUserTrailsRepository } from '../domain/repositories/user-trails-repository';
import { ListAllUserTrailsFromUserRequestDTO } from '../dtos/list-all-user-trails-from-user-request-dto';

export type Count = {
  _count: {
    lessons: number;
    user_trails: number;
    playlists: number;
  };
};

export type CustomUserTrail = {
  user: IUser | null;
  playlists: undefined;
  _count: {
    users: number;
    lessons: number;
    playlists: number;
  };
  user_trail: {
    progress: number;
    enabled: boolean;
  } | null;
  id: string;
  name: string;
  description: string;
  slug: string;
  avatar: string | null;
  updated_at: Date;
  created_at: Date;
};

type Response = CustomUserTrail[];
@injectable()
export class ListAllUserTrailsFromUserService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,
  ) {}

  async execute({
    user_id,
    order,
    skip,
    take,
    enabled: enabled_,
  }: ListAllUserTrailsFromUserRequestDTO): Promise<Response> {
    const userTrails = await this.userTrailsRepository.findAllUserTrails({
      user_id,
      order,
      skip,
      take,
      enabled: enabled_,
    });

    const trails = userTrails.map(
      ({ enabled, trail, progress, user: _user }) => {
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
          user: _user,
          playlists: undefined,
          _count: {
            playlists: (trail as ITrail & Count)._count.playlists,
            user_trails: undefined,
            users: (trail as ITrail & Count)._count.user_trails,
            lessons: lessonsAmount,
          },
          user_trail: {
            progress,
            enabled,
          },
        };
      },
    );

    return trails;
  }
}
