import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { AppError } from '@shared/errors/app-error';
import { inject, injectable } from 'tsyringe';
import { IUserLesson } from '../domain/entities/iuser-lesson';
import { ILessonsRepository } from '../domain/repositories/lessons-repository';
import { IUserLessonsRepository } from '../domain/repositories/user-lessons-repository';
import { ChangeCompleteUserLessonRequestDTO } from '../dtos/change-complete-user-lesson-request-dto';
import { RefreshUserLessonProgressService } from './refresh-user-lesson-progress-service';

@injectable()
class ChangeCompleteUserLessonService {
  constructor(
    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserLessonsRepository')
    private userLessonsRepository: IUserLessonsRepository,

    @inject('RefreshUserLessonProgressService')
    private refreshUserLessonProgressService: RefreshUserLessonProgressService,
  ) {}

  async execute({
    lesson_id,
    user_id,
  }: ChangeCompleteUserLessonRequestDTO): Promise<IUserLesson> {
    const user = await this.usersRepository.findById(user_id);
    const lesson = await this.lessonsRepository.findById(lesson_id);

    if (!user) throw new AppError('User does not exist', 12, 401);
    if (!lesson) throw new AppError('Lesson entered does not exists', 12, 403);

    const userLesson = await this.userLessonsRepository.findOne({
      lesson_id,
      user_id,
    });

    if (!userLesson)
      throw new AppError('This user lesson does not exist', 13, 403);

    userLesson.completed = !userLesson.completed;

    await this.userLessonsRepository.save(userLesson);

    await this.refreshUserLessonProgressService.execute({
      block_id: lesson.block_id,
      user_id,
    });

    return userLesson;
  }
}

export { ChangeCompleteUserLessonService };
