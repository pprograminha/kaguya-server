import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IClass } from '../domain/entities/IClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';

@injectable()
class ShowClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute(class_id: string): Promise<IClass> {
    const _class = await this.classesRepository.findById(class_id);

    if (!_class) {
      throw new AppError('Class does not exist', 403);
    }

    return _class;
  }
}

export { ShowClassService };
