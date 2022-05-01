import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { Maybe } from '@shared/types/app';
import { IClass } from '../domain/entities/iclass';
import { IClassesRepository } from '../domain/repositories/classes-repository';
import { ShowClassRequestDTO } from '../dtos/show-class-request-dto';
import { IViewsRepository } from '../domain/repositories/views-repository';

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
    class_slug,
    block_slug,
    user_id,
  }: ShowClassRequestDTO): Promise<IClass> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    let findedClass: Maybe<IClass>;

    if (!class_id && (!class_slug || !block_slug)) {
      throw new AppError('Enter some search attribute', 8, 400);
    }

    if (class_id) {
      findedClass = await this.classesRepository.findById(class_id, {
        _count: {
          dislikes: true,
          likes: true,
          views: true,
        },
      });
    } else if (class_slug && block_slug) {
      findedClass = await this.classesRepository.findByName(
        {
          block_name: block_slug,
          name: class_slug,
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
      throw new AppError('Class does not exist', 12, 400);
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
