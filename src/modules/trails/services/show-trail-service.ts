import { IBlock } from '@modules/blocks/domain/entities/iblock';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { ITrail } from '../domain/entities/itrail';
import { ITrailsRepository } from '../domain/repositories/trails-repository';
import { ShowTrailRequestDTO } from '../dtos/show-trail-request-dto';
import { CustomUserTrail } from './list-all-user-trails-from-user-service';

type Count = {
  _count: {
    playlists: number;
    users: number;
    lessons: number;
  };
};

@injectable()
class ShowTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({
    trail_id,
    user_id,
    slug,
  }: ShowTrailRequestDTO): Promise<CustomUserTrail> {
    if (!trail_id && !slug)
      throw new AppError('Trail id or slug is required', 8, 400);

    let trail: Maybe<ITrail>;

    if (trail_id) trail = await this.trailsRepository.findById(trail_id);
    else trail = await this.trailsRepository.findBySlug(slug as string);

    if (!trail) {
      throw new AppError('Trail does not exist', 12, 400);
    }

    const lessonsAmount = trail.playlists.reduce(
      (_, playlist) =>
        playlist.blocks.reduce(
          (acc, block) => acc + (block as IBlock & Count)._count.lessons,
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

    const customUserTrail: CustomUserTrail = {
      id: trail.id,
      name: trail.name,
      slug: trail.slug,
      playlists: undefined,
      user: findedUserTrail?.user || null,
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
        lessons: lessonsAmount,
      },
      created_at: trail.created_at,
      updated_at: trail.updated_at,
    };

    return customUserTrail;
  }
}

export { ShowTrailService };
