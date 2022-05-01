import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { Maybe } from '@shared/types/app';
import { IHistory } from '../domain/entities/ihistory';
import { IHistoriesRepository } from '../domain/repositories/histories-repository';
import { ShowHistoryRequestDTO } from '../dtos/show-history-request-dto';

@injectable()
export class ShowHistoryService {
  constructor(
    @inject('HistoriesRepository')
    private historiesRepository: IHistoriesRepository,
  ) {}

  async execute({
    user_id,
    history_id,
  }: ShowHistoryRequestDTO): Promise<IHistory> {
    let history: Maybe<IHistory>;

    if (history_id) {
      history = await this.historiesRepository.findById(history_id);
    } else {
      history = await this.historiesRepository.findLatestHistory(user_id);
    }

    if (!history) {
      throw new AppError('History does not exist', 12, 400);
    }

    return history;
  }
}
