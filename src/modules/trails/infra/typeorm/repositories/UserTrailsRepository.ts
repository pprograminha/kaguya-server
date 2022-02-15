import { IUserTrail } from '@modules/trails/domain/entities/IUserTrail';
import { IUserTrailsRepository } from '@modules/trails/domain/repositories/IUserTrailsRepository';
import { ICreateUserTrailDTO } from '@modules/trails/dtos/ICreateUserTrailDTO';
import { IFindUserTrailDTO } from '@modules/trails/dtos/IFindUserTrailDTO';
import { getRepository, Repository } from 'typeorm';
import { UserTrail } from '../entities/UserTrail';

export class UserTrailsRepository implements IUserTrailsRepository {
  private ormRepository: Repository<IUserTrail>;

  constructor() {
    this.ormRepository = getRepository(UserTrail);
  }

  async findOne({
    trail_id,
    user_id,
  }: IFindUserTrailDTO): Promise<IUserTrail | undefined> {
    const userTrail = await this.ormRepository.findOne({
      where: {
        trail_id,
        user_id,
      },
    });

    return userTrail;
  }

  async save(userTrail: IUserTrail): Promise<IUserTrail> {
    const userTrailSaved = await this.ormRepository.save(userTrail);

    return userTrailSaved;
  }

  async removeById(user_trail_id: string): Promise<void> {
    await this.ormRepository.delete(user_trail_id);
  }

  async findUserTrail({
    trail_id,
    user_id,
  }: IFindUserTrailDTO): Promise<IUserTrail | undefined> {
    const userTrail = this.ormRepository.findOne({
      where: {
        trail_id,
        user_id,
      },
      relations: ['trail'],
    });

    return userTrail;
  }

  async findAllUserTrails(user_id: string): Promise<IUserTrail[]> {
    const userTrails = this.ormRepository.find({
      where: {
        user_id,
      },
      relations: ['user', 'trail'],
    });

    return userTrails;
  }

  async create(data: ICreateUserTrailDTO): Promise<IUserTrail> {
    const userTrail = this.ormRepository.create(data);

    await this.ormRepository.save(userTrail);

    return userTrail;
  }

  async findById(user_trail_id: string): Promise<IUserTrail | undefined> {
    const userTrail = await this.ormRepository.findOne({
      where: {
        id: user_trail_id,
      },
      relations: ['trail', 'user'],
    });

    return userTrail;
  }
}
