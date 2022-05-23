import { IBlocksRepository } from '@modules/blocks/domain/repositories/blocks-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from '@shared/container';
import { ILesson } from '../domain/entities/ilesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '../domain/repositories/user-lessons-repository';
import { CreateLessonRequestDTO } from '../dtos/create-lesson-request-dto';
import { RefreshUserLessonProgressService } from './refresh-user-lesson-progress-service';

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

    @inject('RefreshUserLessonProgressService')
    private refreshUserLessonProgressService: RefreshUserLessonProgressService,
  ) {}

  async execute({
    block_id,
    description,
    link,
    slug,
    name,
  }: CreateLessonRequestDTO): Promise<ILesson> {
    const block = await this.blocksRepository.findById(block_id);

    if (!block)
      throw new AppError('This block entered does not exist', 12, 400);

    const checkNameAlreadyExists = await this.lessonsRepository.findByName({
      name,
      block_name: block.name,
    });

    if (checkNameAlreadyExists) {
      throw new AppError('Name already exists', 23, 400);
    }

    const checkSlugAlreadyExists = await this.lessonsRepository.findBySlug({
      slug,
      block_slug: block.slug,
    });

    if (checkSlugAlreadyExists) {
      throw new AppError('Slug already exists', 23, 400);
    }

    const createdLesson = await this.lessonsRepository.create({
      block_id,
      description,
      link,
      slug,
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
        block_id,
        lesson_id: createdLesson.id,
        completed: false,
      });

      await this.refreshUserLessonProgressService.execute({
        block_id,
        user_id: user.id,
      });
    });

    await Promise.all(userLessonPromises);

    return createdLesson;
  }
}

export { CreateLessonService };
