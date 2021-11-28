import { IBlock } from '@modules/blocks/domain/entities/IBlock';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
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

type Response = Omit<
  Omit<Omit<Omit<ITrail, 'playlists'>, 'user_trails'>, 'avatar_url'>,
  'getAvatarUrl'
> &
  Count;

@injectable()
class ShowTrailService {
  constructor(
    @inject('TrailsRepository')
    private trailsRepository: ITrailsRepository,
  ) {}

  async execute({ trail_id }: ShowTrailRequestDTO): Promise<Response> {
    const trail = await this.trailsRepository.findById(trail_id);

    if (!trail) {
      throw new AppError('Trail does not exist', 403);
    }

    let classesAmount = 0;

    trail.playlists.forEach(playlist =>
      playlist.blocks.forEach(block => {
        classesAmount += (block as IBlock & Count)._count.classes;
      }),
    );
    return {
      id: trail.id,
      name: trail.name,
      description: trail.description,
      avatar: trail.avatar,
      created_at: trail.created_at,
      updated_at: trail.updated_at,
      _count: {
        playlists: (trail as ITrail & Count)._count.playlists,
        users: (trail as any)._count.user_trails,
        classes: classesAmount,
      },
    };
  }
}

export { ShowTrailService };
