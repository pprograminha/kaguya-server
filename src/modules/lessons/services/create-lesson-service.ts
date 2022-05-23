import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { ILesson } from '../domain/entities/ilesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '../domain/repositories/user-lessons-repository';
import { CreateLessonRequestDTO } from '../dtos/create-lesson-request-dto';

@injectable()
class CreateLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,

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
  }: CreateLessonRequestDTO): Promise<ILesson> {
    const block = await this.blocksRepository.findById(block_id);

    if (!block)
      throw new AppError('This block entered does not exist', 12, 400);

    const lessonCreated = await this.lessonsRepository.create({
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

    const userLessonPromises = users.map(async user => {
      await this.userLessonsRepository.create({
        user_id: user.id,
        block_id: block.id,
        lesson_id: lessonCreated.id,
        completed: false,
      });
    });

    await Promise.all(userLessonPromises);

    return lessonCreated;
  }
}

export { CreateLessonService };
