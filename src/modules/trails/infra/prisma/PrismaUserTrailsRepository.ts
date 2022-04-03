import { IUserTrail } from '@modules/trails/domain/entities/iuser-trail';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { IRelationshipsDTO } from '@modules/users/domain/repositories/iusers-repository';
import { prisma } from '@shared/infra/prisma/connection';
import { AsyncMaybe } from '@shared/types/app';
import crypto from 'crypto';

class PrismaUserTrailsRepository implements IUserTrailsRepository {
  async create(data: ICreateUserTrailDTO): Promise<IUserTrail> {
    const userTrail = await prisma.userTrail.create({
      data: {
        id: crypto.randomUUID(),
        ...data,
      },
    });

    return userTrail as IUserTrail;
  }

  async save(userTrail: IUserTrail): Promise<IUserTrail> {
    const userTrailUpdated = await prisma.userTrail.update({
      where: {
        id: userTrail.id,
      },
      data: {
        enabled: userTrail.enabled,
        progress: userTrail.progress,
        updated_at: new Date(),
      },
    });

    return userTrailUpdated as IUserTrail;
  }

  async findById(user_trail_id: string): AsyncMaybe<IUserTrail> {
    const userTrail = await prisma.userTrail.findUnique({
      where: {
        id: user_trail_id,
      },
      include: {
        user: true,
        trail: true,
      },
    });

    return userTrail as IUserTrail | null;
  }

  async findUserTrail({
    trail_id,
    user_id,
  }: IFindUserTrailDTO): AsyncMaybe<IUserTrail> {
    const userTrail = await prisma.userTrail.findFirst({
      where: {
        trail_id,
        user_id,
      },
      include: {
        trail: true,
      },
    });

    return userTrail as IUserTrail | null;
  }

  async removeById(user_trail_id: string): Promise<void> {
    await prisma.userTrail.delete({
      where: {
        id: user_trail_id,
      },
    });
  }

  async findAllUserTrails(
    user_id: string,
    relationship: IRelationshipsDTO,
  ): Promise<IUserTrail[]> {
    const userTrails = await prisma.userTrail.findMany({
      where: {
        user_id,
      },
      include: {
        trail: true,
        ...(relationship && relationship.user
          ? {
              user: true,
            }
          : {}),
      },
    });

    return userTrails as IUserTrail[];
  }
}
export { PrismaUserTrailsRepository };
