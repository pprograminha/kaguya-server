import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { ITrail } from '../domain/entities/ITrail';
import { ITrailsRepository } from '../domain/repositories/ITrailsRepository';
import { ShowTrailRequestDTO } from '../dtos/ShowTrailRequestDTO';

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
  progress: number;
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

    let trail: ITrail | undefined;

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
    const userTrailFinded = trail.user_trails.find(
      userTrail =>
        userTrail.user_id === user_id && userTrail.trail_id === trail?.id,
    );

    if (userTrailFinded) {
      progress = userTrailFinded.progress;
    }

    return {
      id: trail.id,
      name: trail.name,
      description: trail.description,
      avatar: trail.avatar,
      progress,
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
