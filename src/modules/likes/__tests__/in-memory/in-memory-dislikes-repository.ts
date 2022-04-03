import { IDislike } from '@modules/likes/domain/entities/idislike';
import { IDislikesRepository } from '@modules/likes/domain/repositories/idislikes-repository';
import { CreateDislikeDTO } from '@modules/likes/dtos/create-dislike-dto';
import { FindOneDislikeFromUserClass } from '@modules/likes/dtos/find-one-dislike-from-user-class';
import { Dislike } from '@modules/likes/entities/dislike';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryDislikesRepository implements IDislikesRepository {
  private dislikes: IDislike[] = [];

  async create(data: CreateDislikeDTO): Promise<IDislike> {
    const dislike = new Dislike();

    Object.assign(dislike, data);

    this.dislikes.push(dislike);

    return dislike;
  }

  async createMany(datas: CreateDislikeDTO[]): Promise<void> {
    datas.forEach(data => this.create(data));
  }

  async findById(dislike_id: string): AsyncMaybe<IDislike> {
    const findedDislike = this.dislikes.find(
      dislike => dislike.id === dislike_id,
    );

    return findedDislike;
  }

  async findAllDislikesFromClass(class_id: string): Promise<IDislike[]> {
    const dislikes = this.dislikes.filter(
      dislike => dislike.class_id === class_id,
    );

    return dislikes;
  }

  async findAllDislikesFromUser(user_id: string): Promise<IDislike[]> {
    const dislikes = this.dislikes.filter(
      dislike => dislike.user_id === user_id,
    );

    return dislikes;
  }

  async findOneDislikeFromUserClass({
    user_id,
    class_id,
  }: FindOneDislikeFromUserClass): AsyncMaybe<IDislike> {
    const findedDislike = this.dislikes.find(
      dislike => dislike.user_id === user_id && dislike.class_id === class_id,
    );

    return findedDislike;
  }

  async save({ id: dislike_id, ...data }: IDislike): Promise<void> {
    const dislikeIndex = this.dislikes.findIndex(
      dislike => dislike.id === dislike_id,
    );

    if (dislikeIndex !== -1) {
      this.dislikes[dislikeIndex] = {
        id: dislike_id,
        ...data,
      };
    }
  }

  async destroyById(dislike_id: string): Promise<void> {
    const dislikeIndex = this.dislikes.findIndex(
      dislike => dislike.id === dislike_id,
    );

    if (dislikeIndex !== -1) {
      this.dislikes.splice(dislikeIndex, 1);
    }
  }
}

export { InMemoryDislikesRepository };
