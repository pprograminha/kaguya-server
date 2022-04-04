import { IClassesRepository } from '@modules/classes/domain/repositories/classes-repository';
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

    @inject('ClassesRepository')
    private classesRepository: IClassesRepository,
  ) {}

  async execute({
    class_id,
    user_id,
  }: CreateHistoryRequestDTO): Promise<IHistory> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    const _class = await this.classesRepository.findById(class_id);

    if (!_class) {
      throw new AppError('Class does not exist', 400);
    }

    const findedHistory = await this.historiesRepository.findUserClassHistory({
      user_id,
      class_id,
    });

    if (!findedHistory) {
      const history = await this.historiesRepository.create({
        user_id,
        class_id,
      });

      return history;
    }

    findedHistory.recent_at = new Date();

    await this.historiesRepository.save(findedHistory);

    return findedHistory;
  }
}
