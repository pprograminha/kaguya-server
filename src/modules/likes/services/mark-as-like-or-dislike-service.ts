import { IClassesRepository } from '@modules/classes/domain/repositories/classes-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { injectable, inject } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IDislikesRepository } from '../domain/repositories/dislikes-repository';
import { ILikesRepository } from '../domain/repositories/likes-repository';
import { MarkAsLikeOrDislikeRequestDTO } from '../dtos/mark-as-like-or-dislike-request-dto';

@injectable()
export class MarkAsLikeOrDislikeService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LikesRepository')
    private likesRepository: ILikesRepository,

    @inject('DislikesRepository')
    private dislikesRepository: IDislikesRepository,
  ) {}

  async execute({
    class_id,
    state,
    user_id,
  }: MarkAsLikeOrDislikeRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const class_ = await this.classesRepository.findById(class_id);

    if (!class_) {
      throw new AppError('Class not found', 403);
    }

    const dislike = await this.dislikesRepository.findOneDislikeFromUserClass({
      class_id,
      user_id,
    });

    const like = await this.likesRepository.findOneLikeFromUserClass({
      class_id,
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
        class_id,
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
        class_id,
        user_id,
      });
    } else if (like) {
      await this.likesRepository.destroyById(like.id);
    } else if (dislike) {
      await this.dislikesRepository.destroyById(dislike.id);
    }
  }
}
