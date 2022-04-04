import { IHistory } from '@modules/histories/domain/entities/ihistory';
import { IHistoriesRepository } from '@modules/histories/domain/repositories/histories-repository';
import { CreateHistoryDTO } from '@modules/histories/dtos/create-history-dto';
import { FindAllHistoriesFromUserDTO } from '@modules/histories/dtos/find-all-histories-from-user-dto';
import { FindUserClassHistoryDTO } from '@modules/histories/dtos/find-user-class-history-dto';
import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaHistoriesRepository implements IHistoriesRepository {
  async findUserClassHistory({
    class_id,
    user_id,
  }: FindUserClassHistoryDTO): AsyncMaybe<IHistory> {
    const history = await prisma.history.findFirst({
      where: {
        user_id,
        class_id,
      },
    });

    return history as IHistory;
  }

  async create(data: CreateHistoryDTO): Promise<IHistory> {
    const history = await prisma.history.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return history as IHistory;
  }

  async findById(history_id: string): AsyncMaybe<IHistory> {
    const history = await prisma.history.findUnique({
      where: {
        id: history_id,
      },
    });

    return history as IHistory;
  }

  async findLatestHistory(user_id: string): AsyncMaybe<IHistory> {
    const history = await prisma.history.findFirst({
      where: {
        user_id,
      },
      orderBy: {
        recent_at: 'desc',
      },
    });

    return history as IHistory;
  }

  async findAllHistories(data?: FiltersDTO): Promise<IHistory[]> {
    const histories = await prisma.history.findMany({
      orderBy: {
        ...(data && data.order
          ? {
              created_at: data.order,
            }
          : {
              recent_at: 'desc',
            }),
      },
      skip: data?.skip,
      take: data?.take,
    });

    return histories as IHistory[];
  }

  async findAllHistoriesFromUser({
    user_id,
    order,
    skip,
    take,
  }: FindAllHistoriesFromUserDTO): Promise<IHistory[]> {
    const histories = await prisma.history.findMany({
      where: {
        user_id,
      },
      orderBy: {
        ...(order
          ? {
              created_at: order,
            }
          : {
              recent_at: 'desc',
            }),
      },
      skip,
      take,
    });

    return histories as IHistory[];
  }

  async save({ id: history_id, ...data }: IHistory): Promise<void> {
    await prisma.history.update({
      where: {
        id: history_id,
      },
      data: {
        recent_at: data.recent_at,
        updated_at: new Date(),
      },
    });
  }

  async destroyById(history_id: string): Promise<void> {
    await prisma.history.delete({
      where: {
        id: history_id,
      },
    });
  }
}

export { PrismaHistoriesRepository };
