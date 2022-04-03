import { IUsersRepository } from '@modules/users/domain/repositories/iusers-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { IHistory } from '../domain/entities/ihistory';
import { IHistoriesRepository } from '../domain/repositories/ihistories-repository';

@injectable()
export class ListHistoriesService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id?: string): Promise<IHistory[]> {
    let histories: IHistory[] = [];

    if (user_id) {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User does not exist', 401);
      }

      histories = await this.historiesRepository.findAllHistoriesFromUser(
        user_id,
      );
    } else {
      histories = await this.historiesRepository.findAllHistories();
    }

    return histories;
  }
}
