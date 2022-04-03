import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { Maybe } from '@shared/types/app';
import { IClass } from '../domain/entities/iclass';
import { IClassesRepository } from '../domain/repositories/iclasses-repository';
import { ShowClassRequestDTO } from '../dtos/show-class-request-dto';
import { IViewsRepository } from '../domain/repositories/iviews-repository';

type Count = {
  _count?: {
    likes?: number;
    dislikes?: number;
    views?: number;
  };
};
@injectable()
class ShowClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('ViewsRepository')
    private viewsRepository: IViewsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    class_id,
    name,
    block_id,
    user_id,
  }: ShowClassRequestDTO): Promise<IClass> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    let findedClass: Maybe<IClass>;

    if (!class_id && (!name || !block_id)) {
      throw new AppError('Enter some search attribute', 403);
    }

    if (class_id) {
      findedClass = await this.classesRepository.findById(class_id, {
        _count: {
          dislikes: true,
          likes: true,
          views: true,
        },
      });
    } else if (name && block_id) {
      findedClass = await this.classesRepository.findByName(
        {
          block_id,
          name,
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

    if (!findedClass) {
      throw new AppError('Class does not exist', 403);
    }

    const view = await this.viewsRepository.findOneViewFromUserClass({
      class_id: findedClass.id,
      user_id,
    });

    if (!view) {
      await this.viewsRepository.create({
        class_id: findedClass.id,
        user_id,
      });

      const _class = findedClass as IClass & Count;

      if (_class._count && _class._count.views !== undefined) {
        (_class._count.views as number) += 1;
      }
    }

    return findedClass;
  }
}

export { ShowClassService };
