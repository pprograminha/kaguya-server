import { ILike } from '@modules/likes/domain/entities/ilike';
import { ILikesRepository } from '@modules/likes/domain/repositories/likes-repository';
import { CreateLikeDTO } from '@modules/likes/dtos/create-like-dto';
import { FindOneLikeFromUserClass } from '@modules/likes/dtos/find-one-like-from-user-class';
import { Like } from '@modules/likes/entities/like';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryLikesRepository implements ILikesRepository {
  private likes: ILike[] = [];

  async create(data: CreateLikeDTO): Promise<ILike> {
    const like = new Like();

    Object.assign(like, data);

    this.likes.push(like);

    return like;
  }

  async createMany(datas: CreateLikeDTO[]): Promise<void> {
    datas.forEach(data => this.create(data));
  }

  async findById(like_id: string): AsyncMaybe<ILike> {
    const findedLike = this.likes.find(like => like.id === like_id);

    return findedLike;
  }

  async findAllLikesFromClass(class_id: string): Promise<ILike[]> {
    const likes = this.likes.filter(like => like.class_id === class_id);

    return likes;
  }

  async findAllLikesFromUser(user_id: string): Promise<ILike[]> {
    const likes = this.likes.filter(like => like.user_id === user_id);

    return likes;
  }

  async findOneLikeFromUserClass({
    user_id,
    class_id,
  }: FindOneLikeFromUserClass): AsyncMaybe<ILike> {
    const findedLike = this.likes.find(
      like => like.user_id === user_id && like.class_id === class_id,
    );

    return findedLike;
  }

  async save({ id: like_id, ...data }: ILike): Promise<void> {
    const likeIndex = this.likes.findIndex(like => like.id === like_id);

    if (likeIndex !== -1) {
      this.likes[likeIndex] = {
        id: like_id,
        ...data,
      };
    }
  }

  async destroyById(like_id: string): Promise<void> {
    const likeIndex = this.likes.findIndex(like => like.id === like_id);

    if (likeIndex !== -1) {
      this.likes.splice(likeIndex, 1);
    }
  }
}

export { InMemoryLikesRepository };
