import { CreateHistoryDTO } from '@modules/histories/dtos/create-history-dto';
import { FindUserClassHistoryDTO } from '@modules/histories/dtos/find-user-class-history-dto';
import { AsyncMaybe } from '@shared/types/app';
import { IHistory } from '../entities/ihistory';

interface IHistoriesRepository {
  create(data: CreateHistoryDTO): Promise<IHistory>;
  findById(history_id: string): AsyncMaybe<IHistory>;
  findLatestHistory(user_id: string): AsyncMaybe<IHistory>;
  findUserClassHistory(data: FindUserClassHistoryDTO): AsyncMaybe<IHistory>;
  findAllHistories(): Promise<IHistory[]>;
  findAllHistoriesFromUser(user_id: string): Promise<IHistory[]>;
  save(history: IHistory): Promise<void>;
  destroyById(history_id: string): Promise<void>;
}

export { IHistoriesRepository };
