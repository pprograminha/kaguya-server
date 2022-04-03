import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { IClass } from '../domain/entities/iclass';
import { IClassesRepository } from '../domain/repositories/iclasses-repository';
import { ListClassesRequestDTO } from '../dtos/list-classes-request-dto';

@injectable()
class ListClassesService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    block_id,
    user_id,
  }: ListClassesRequestDTO): Promise<IClass[]> {
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
