import { CreateHistoryService } from '@modules/histories/services/create-history-service';
import { IDislike } from '@modules/likes/domain/entities/idislike';
import { ILike } from '@modules/likes/domain/entities/ilike';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { ILesson } from '../domain/entities/ilesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { IViewsRepository } from '../domain/repositories/views-repository';
import { ShowLessonRequestDTO } from '../dtos/show-lesson-request-dto';

type Count = {
  _count?: {
    likes?: number;
    dislikes?: number;
    views?: number;
  };
};

type ShowLessonRequestResponse = ILesson & {
  state: 'liked' | 'disliked' | 'none';
};

@injectable()
class ShowLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CreateHistoryService')
    private createHistoryService: CreateHistoryService,
  ) {}

  async execute({
    lesson_id,
    lesson_slug,
    block_slug,
    user_id,
  }: ShowLessonRequestDTO): Promise<ShowLessonRequestResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    let findedLesson: Maybe<
      ILesson & {
        likes: ILike[];
        dislikes: IDislike[];
      }
    >;

    if (!lesson_id && (!lesson_slug || !block_slug)) {
      throw new AppError('Enter some search attribute', 8, 400);
    }

    if (lesson_id) {
      findedLesson = await this.lessonsRepository.findById(lesson_id, {
        _count: {
          dislikes: true,
          likes: true,
          views: true,
        },
      });
    } else if (lesson_slug && block_slug) {
      findedLesson = await this.lessonsRepository.findBySlug(
        {
          block_slug,
          slug: lesson_slug,
        },
        {
          _count: {
            dislikes: true,
            likes: true,
            views: true,
          },
        },
      );
    }

    if (!findedLesson) {
      throw new AppError('Lesson does not exist', 12, 400);
    }

    const view = await this.viewsRepository.findOneViewFromUserLesson({
      lesson_id: findedLesson.id,
      user_id,
    });

    if (!view) {
      await this.viewsRepository.create({
        lesson_id: findedLesson.id,
        user_id,
      });

      const _lesson = findedLesson as ILesson & Count;

      if (_lesson._count && _lesson._count.views !== undefined) {
        (_lesson._count.views as number) += 1;
      }
    }

    await this.createHistoryService.execute({
      lesson_id: findedLesson.id,
      user_id,
    });

    const liked =
      findedLesson.likes.some(like => like.user_id === user_id) && 'liked';

    const disliked =
      findedLesson.dislikes.some(dislike => dislike.user_id === user_id) &&
      'disliked';

    return {
      ...findedLesson,
      state: disliked || liked || 'none',
    };
  }
}

export { ShowLessonService };
