import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IClass } from '../domain/entities/IClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { IShowClassRequestDTO } from '../dtos/IShowClassRequestDTO';

@injectable()
class ShowClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute({
    class_id,
    name,
    block_id,
  }: IShowClassRequestDTO): Promise<IClass> {
    let _class: IClass | undefined;

    if (!class_id && (!name || !block_id)) {
      throw new AppError('Enter some search attribute', 403);
    }

    if (class_id) {
      _class = await this.classesRepository.findById(class_id);
    } else if (name && block_id) {
      _class = await this.classesRepository.findByName({
        block_id,
        name,
      });
    }

    if (!_class) {
      throw new AppError('Class does not exist', 403);
    }

    return _class;
  }
}

export { ShowClassService };
