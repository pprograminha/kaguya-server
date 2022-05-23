import { ILessonsRepository } from '@modules/lessons/domain/repositories/lessons-repository';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IHistory } from '../domain/entities/ihistory';
import { IHistoriesRepository } from '../domain/repositories/histories-repository';
import { CreateHistoryRequestDTO } from '../dtos/create-history-request-dto';

@injectable()
export class CreateHistoryService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('LessonsRepository')
    private lessonsRepository: ILessonsRepository,
  ) {}

  async execute({
    lesson_id,
    user_id,
  }: CreateHistoryRequestDTO): Promise<IHistory> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 5, 401);
    }

    const _lesson = await this.lessonsRepository.findById(lesson_id);

    if (!_lesson) {
      throw new AppError('Lesson does not exist', 12, 400);
    }

    const findedHistory = await this.historiesRepository.findUserLessonHistory({
      user_id,
      lesson_id,
    });

    if (!findedHistory) {
      const history = await this.historiesRepository.create({
        user_id,
        lesson_id,
      });

      return history;
    }

    findedHistory.recent_at = new Date();

    await this.historiesRepository.save(findedHistory);

    return findedHistory;
  }
}
