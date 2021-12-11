import { IBlocksRepository } from '@modules/blocks/domain/repositories/IBlocksRepository';
import { IUserBlocksRepository } from '@modules/blocks/domain/repositories/IUserBlocksRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUserClass } from '../domain/entities/IUserClass';
import { IClassesRepository } from '../domain/repositories/IClassesRepository';
import { IUserClassesRepository } from '../domain/repositories/IUserClassesRepository';
import { CompleteUserClassRequestDTO } from '../dtos/CompleteUserClassRequestDTO';
import { UserClass } from '.prisma/client';

@injectable()
class CreateClassService {
  constructor(
    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,

    @inject('UserClassesRepository')
    private userClassesRepository: IUserClassesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserBlocksRepository')
    private userblocksRepository: IUserBlocksRepository,
  ) {}

  async execute({
    user_class_id,
  }: CompleteUserClassRequestDTO): Promise<IUserClass> {
    const userClass = await this.userClassesRepository.findById(user_class_id);
    if (!userClass)
      throw new AppError('This user class entered does not exist', 403);

    userClass.completed = true;

    await this.userClassesRepository.save(userClass);

    const userClasses = await this.userClassesRepository.findUserClasses({
      class_id: userClass.class_id,
      user_id: userClass.user_id,
    });

    const userClassesCompleted = userClasses.filter(
      user_class => user_class.completed,
    );

    const blockPercentageCompleted = Number(
      ((userClassesCompleted.length / userClasses.length) * 100).toFixed(0) ||
        0,
    );

    const userBlock = await this.userblocksRepository.findById(
      userClass.user_block_id,
    );
    if (userBlock) {
      userBlock.playlist_progress_percentage = blockPercentageCompleted;
    }

    return userClass;
  }
}

export { CreateClassService };
