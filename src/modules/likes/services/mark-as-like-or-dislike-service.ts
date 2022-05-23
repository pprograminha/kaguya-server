import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { injectable, inject } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IDislikesRepository } from '../domain/repositories/dislikes-repository';
import { ILikesRepository } from '../domain/repositories/likes-repository';
import { MarkAsLikeOrDislikeRequestDTO } from '../dtos/mark-as-like-or-dislike-request-dto';

@injectable()
export class MarkAsLikeOrDislikeService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('DislikesRepository')
    private dislikesRepository: IDislikesRepository,
  ) {}

  async execute({
    lesson_id,
    state,
    user_id,
  }: MarkAsLikeOrDislikeRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    const lesson_ = await this.lessonsRepository.findById(lesson_id);

    if (!lesson_) {
      throw new AppError('Lesson does not exist', 12, 400);
    }

    const dislike = await this.dislikesRepository.findOneDislikeFromUserLesson({
      lesson_id,
      user_id,
    });

    const like = await this.likesRepository.findOneLikeFromUserLesson({
      lesson_id,
      user_id,
    });

    if (state === 'like') {
      if (like) {
        await this.likesRepository.destroyById(like.id);

        return;
      }

      if (dislike) {
        await this.dislikesRepository.destroyById(dislike.id);
      }

      await this.likesRepository.create({
        lesson_id,
        user_id,
      });
    } else if (state === 'dislike') {
      if (dislike) {
        await this.dislikesRepository.destroyById(dislike.id);

        return;
      }

      if (like) {
        await this.likesRepository.destroyById(like.id);
      }

      await this.dislikesRepository.create({
        lesson_id,
        user_id,
      });
    } else if (like) {
      await this.likesRepository.destroyById(like.id);
    } else if (dislike) {
      await this.dislikesRepository.destroyById(dislike.id);
    }
  }
}
