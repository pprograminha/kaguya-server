import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { UserTrail } from '@modules/trails/infra/typeorm/entities/UserTrail';

export class FakeUserTrailsRepository implements IUserTrailsRepository {
  private userTrails: IUserTrail[] = [];

  async removeById(user_trail_id: string): Promise<void> {
    const userTrails = this.userTrails.filter(
      userTrail => userTrail.id !== user_trail_id,
    );

    this.userTrails = userTrails;
  }

  async findUserTrail({
    trail_id,
    user_id,
  }: IFindUserTrailDTO): Promise<IUserTrail | undefined> {
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

    Object.assign(userTrail, data);

    this.userTrails.push(userTrail);

    return userTrail;
  }

  async findById(user_trail_id: string): Promise<IUserTrail | undefined> {
    const userTrail = this.userTrails.find(
      userTrailFind => userTrailFind.id === user_trail_id,
    );

    return userTrail;
  }
}
