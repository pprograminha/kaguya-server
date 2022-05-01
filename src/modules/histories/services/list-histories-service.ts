import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IHistory } from '../domain/entities/ihistory';
import { IHistoriesRepository } from '../domain/repositories/histories-repository';
import { ListHistoriesRequestDTO } from '../dtos/list-histories-request-dto';

@injectable()
export class ListHistoriesService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    user_id,
    order,
    skip,
    take,
  }: ListHistoriesRequestDTO): Promise<IHistory[]> {
    let histories: IHistory[] = [];

    if (user_id) {
      const user = await this.usersRepository.findById(user_id);

      if (!user) {
        throw new AppError('User does not exist', 5, 401);
      }

      histories = await this.historiesRepository.findAllHistoriesFromUser({
        user_id,
        order,
        skip,
        take,
      });
    } else {
      histories = await this.historiesRepository.findAllHistories({
        order,
        skip,
        take,
      });
    }

    return histories;
  }
}
