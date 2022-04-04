import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { ShowTrailRequestDTO } from '../dtos/show-trail-request-dto';

type Count = {
  _count: {
    playlists: number;
    users: number;
    classes: number;
  };
};

type Response = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  user_trail: {
    progress: number;
    enabled: boolean;
  } | null;
  created_at: Date;
  updated_at: Date;
} & Count;

@injectable()
class ShowTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
    name,
  }: ShowTrailRequestDTO): Promise<Response> {
    if (!trail_id && !name)
      throw new AppError('Trail id or name is required', 400);

    let trail: Maybe<ITrail>;

    if (trail_id) trail = await this.trailsRepository.findById(trail_id);
    else trail = await this.trailsRepository.findByName(name as string);

    if (!trail) {
      throw new AppError('Trail does not exist', 403);
    }

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
        userTrail.user_id === user_id && userTrail.trail_id === trail?.id,
    );

    if (findedUserTrail) {
      progress = findedUserTrail.progress;
    }

    return {
      id: trail.id,
      name: trail.name,
      description: trail.description,
      avatar: trail.avatar,
      user_trail: findedUserTrail
        ? {
            progress,
            enabled: findedUserTrail.enabled,
          }
        : null,
      _count: {
        playlists: (trail as ITrail & Count)._count.playlists,
        users: (trail as any)._count.user_trails,
        classes: classesAmount,
      },
      created_at: trail.created_at,
      updated_at: trail.updated_at,
    };
  }
}

export { ShowTrailService };
