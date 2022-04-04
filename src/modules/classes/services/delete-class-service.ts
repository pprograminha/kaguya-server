import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { IClassesRepository } from '../domain/repositories/classes-repository';

@injectable()
class DeleteClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute(class_id: string): Promise<void> {
    const _class = await this.classesRepository.findById(class_id);

    if (!_class) {
      throw new AppError('Class does not exist', 403);
    }

    await this.classesRepository.destroyById(_class.id);
  }
}

export { DeleteClassService };
