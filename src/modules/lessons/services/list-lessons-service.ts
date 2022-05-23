import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { ILesson } from '../domain/entities/ilesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { ListLessonsRequestDTO } from '../dtos/list-lessons-request-dto';

@injectable()
class ListLessonsService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    block_id,
    user_id,
    order,
    skip,
    take,
  }: ListLessonsRequestDTO): Promise<ILesson[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 15, 401);

    let lessons: ILesson[];

    if (block_id) {
      lessons = await this.lessonsRepository.findAllLessonsFromBlock({
        block_id,
        order,
        skip,
        take,
      });
    } else {
      lessons = await this.lessonsRepository.findAllLessons({
        order,
        skip,
        take,
      });
    }
    lessons = lessons.map(_lesson => {
      const completed = _lesson.user_lessons.some(
        user_lesson =>
          user_lesson.user_id === user_id &&
          user_lesson.lesson_id === _lesson.id &&
          user_lesson.completed,
      );

      return {
        ..._lesson,
        user_lessons: undefined,
        completed,
      } as unknown as ILesson;
    });

    return lessons;
  }
}

export { ListLessonsService };
