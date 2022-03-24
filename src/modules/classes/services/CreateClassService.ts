import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { IClass } from '../domain/entities/IClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '../domain/repositories/IUserClassesRepository';
import { ICreateClassRequestDTO } from '../dtos/ICreateClassRequestDTO';

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

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

    const users = await this.usersRepository.findAllUsersAssociatedWithTheBlock(
      {
        block_id,
      },
    );

    const userClassPromises = users.map(async user => {
      await this.userClassesRepository.create({
        user_id: user.id,
        block_id: block.id,
        class_id: classCreated.id,
        completed: false,
      });
    });

    await Promise.all(userClassPromises);

    return classCreated;
  }
}

export { CreateClassService };
