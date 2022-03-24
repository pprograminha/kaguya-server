import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IClass } from '../domain/entities/IClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '../domain/repositories/IUserClassesRepository';
import { IListClassesRequestDTO } from '../dtos/IListClassesRequestDTO';

@injectable()
class ListClassesService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    block_id,
    user_id,
  }: IListClassesRequestDTO): Promise<IClass[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 401);

    let classes: IClass[];

    if (block_id) {
      classes = await this.classesRepository.findAllClassesFromBlock(block_id);
    } else {
      classes = await this.classesRepository.findAllClasses();
    }
    classes = classes.map(_class => {
      const completed = _class.user_classes.some(
        user_class =>
          user_class.user_id === user_id &&
          user_class.class_id === _class.id &&
          user_class.completed,
      );

      return {
        ..._class,
        user_classes: undefined,
        completed,
      } as unknown as IClass;
    });

    return classes;
  }
}

export { ListClassesService };
