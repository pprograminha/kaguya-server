import { CreateHistoryDTO } from '@modules/histories/dtos/create-history-dto';
import { FindAllHistoriesFromUserDTO } from '@modules/histories/dtos/find-all-histories-from-user-dto';
import { FindUserLessonHistoryDTO } from '@modules/histories/dtos/find-user-lesson-history-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { AsyncMaybe } from '@shared/types/app';
import { IHistory } from '../entities/ihistory';

interface IHistoriesRepository {
  create(data: CreateHistoryDTO): Promise<IHistory>;
  findById(history_id: string): AsyncMaybe<IHistory>;
  findLatestHistory(user_id: string): AsyncMaybe<IHistory>;
  findUserLessonHistory(data: FindUserLessonHistoryDTO): AsyncMaybe<IHistory>;
  findAllHistories(data?: FiltersDTO): Promise<IHistory[]>;
  findAllHistoriesFromUser(
    data: FindAllHistoriesFromUserDTO,
  ): Promise<IHistory[]>;
  save(history: IHistory): Promise<void>;
  destroyById(history_id: string): Promise<void>;
}

export { IHistoriesRepository };
