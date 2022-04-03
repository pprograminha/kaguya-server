import { IUserTrail } from '@modules/trails/domain/entities/iuser-trail';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { UserTrail } from '@modules/trails/entities/user-trail';
import { AsyncMaybe } from '@shared/types/app';

export class FakeUserTrailsRepository implements IUserTrailsRepository {
  private userTrails: IUserTrail[] = [];

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
  }: IFindUserTrailDTO): AsyncMaybe<IUserTrail> {
    const userTrailFinded = this.userTrails.find(
      userTrail =>
        userTrail.trail_id === trail_id && userTrail.user_id === user_id,
    );

    return userTrailFinded;
  }

  async findAllUserTrails(user_id: string): Promise<IUserTrail[]> {
    const userTrails = this.userTrails.filter(
      userTrail => userTrail.user_id === user_id,
    );

    return userTrails;
  }

  async create(data: ICreateUserTrailDTO): Promise<IUserTrail> {
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
