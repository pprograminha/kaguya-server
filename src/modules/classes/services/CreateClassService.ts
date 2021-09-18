import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IClass } from '../domain/entities/IClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { ICreateClassRequestDTO } from '../dtos/ICreateClassRequestDTO';

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('BlocksRepository')
    private blocksRepository: IBlocksRepository,
  ) {}

  async execute({
    block_id,
    description,
    link,
    name,
  }: ICreateClassRequestDTO): Promise<IClass> {
    const block = await this.blocksRepository.findById(block_id);

    if (!block) throw new AppError('This block entered does not exist', 403);

    const classCreated = await this.classesRepository.create({
      block_id,
      description,
      link,
      name,
    });

    return classCreated;
  }
}

export { CreateClassService };
