import { IHistory } from '@modules/histories/domain/entities/ihistory';
import { IHistoriesRepository } from '@modules/histories/domain/repositories/histories-repository';
import { CreateHistoryDTO } from '@modules/histories/dtos/create-history-dto';
import { FindAllHistoriesFromUserDTO } from '@modules/histories/dtos/find-all-histories-from-user-dto';
import { FindUserLessonHistoryDTO } from '@modules/histories/dtos/find-user-lesson-history-dto';
import { History } from '@modules/histories/entities/history';
import { AsyncMaybe } from '@shared/types/app';

class InMemoryHistoriesRepository implements IHistoriesRepository {
  private histories: IHistory[] = [];

  async findAllHistoriesFromUser({
    user_id,
  }: FindAllHistoriesFromUserDTO): Promise<IHistory[]> {
    return this.histories.filter(history => history.user_id === user_id);
  }

  async findUserLessonHistory({
    lesson_id,
    user_id,
  }: FindUserLessonHistoryDTO): AsyncMaybe<IHistory> {
    const findedHistory = this.histories.find(
      history => history.user_id === user_id && history.lesson_id === lesson_id,
    );

    return findedHistory;
  }

  async create(data: CreateHistoryDTO): Promise<IHistory> {
    const history = new History({
      lesson_id: data.lesson_id,
      user_id: data.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    }) as unknown as IHistory;

    this.histories.push(history);

    return history;
  }

  async findById(history_id: string): AsyncMaybe<IHistory> {
    const findedHistory = this.histories.find(
      history => history.id === history_id,
    );

    return findedHistory;
  }

  async findLatestHistory(user_id: string): AsyncMaybe<IHistory> {
    const findedHistory = this.histories.find(
      history => history.user_id === user_id,
    );

    return findedHistory;
  }

  async findAllHistories(): Promise<IHistory[]> {
    return this.histories;
  }

  async save(history: IHistory): Promise<void> {
    const index = this.histories.findIndex(
      findHistory => findHistory.id === history.id,
    );

    this.histories[index] = history;
  }

  async destroyById(history_id: string): Promise<void> {
    const index = this.histories.findIndex(
      findHistory => findHistory.id === history_id,
    );

    this.histories.splice(index, 1);
  }
}

export { InMemoryHistoriesRepository };
