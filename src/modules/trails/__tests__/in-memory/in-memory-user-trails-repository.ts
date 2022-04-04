import { IUserTrail } from '@modules/trails/domain/entities/iuser-trail';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/user-trails-repository';
import { FindAllUserTrailsDTO } from '@modules/trails/dtos/find-all-user-trails-dto';
import { CreateUserTrailDTO } from '@modules/trails/dtos/create-user-trail-dto';
import { FindUserTrailDTO } from '@modules/trails/dtos/find-user-trail-dto';
import { UserTrail } from '@modules/trails/entities/user-trail';
import { AsyncMaybe } from '@shared/types/app';

export class InMemoryUserTrailsRepository implements IUserTrailsRepository {
  private userTrails: IUserTrail[] = [];

  async findAllUserTrails({
    user_id,
  }: FindAllUserTrailsDTO): Promise<IUserTrail[]> {
    const userTrails = this.userTrails.filter(
      userTrail => userTrail.user_id === user_id,
    );

    return userTrails;
  }

  async save(userTrail: IUserTrail): Promise<IUserTrail> {
    const userTrailIndex = this.userTrails.findIndex(
      userTrailFind => userTrailFind.id === userTrail.id,
    );

    this.userTrails[userTrailIndex] = userTrail;

    return userTrail;
  }

  async removeById(user_trail_id: string): Promise<void> {
    const userTrails = this.userTrails.filter(
      userTrail => userTrail.id !== user_trail_id,
    );

    this.userTrails = userTrails;
  }

  async findUserTrail({
    trail_id,
    user_id,
  }: FindUserTrailDTO): AsyncMaybe<IUserTrail> {
    const userTrailFinded = this.userTrails.find(
      userTrail =>
        userTrail.trail_id === trail_id && userTrail.user_id === user_id,
    );

    return userTrailFinded;
  }

  async create(data: CreateUserTrailDTO): Promise<IUserTrail> {
    const userTrail = new UserTrail();

    Object.assign(userTrail, {
      ...data,
      progress: 0,
      enabled: true,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTrails.push(userTrail);

    return userTrail;
  }

  async findById(user_trail_id: string): AsyncMaybe<IUserTrail> {
    const userTrail = this.userTrails.find(
      userTrailFind => userTrailFind.id === user_trail_id,
    );

    return userTrail;
  }
}
