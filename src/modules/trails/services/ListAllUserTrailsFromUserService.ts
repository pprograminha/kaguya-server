import { inject, injectable } from 'tsyringe';
import { IUserTrail } from '../domain/entities/IUserTrail';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';

@injectable()
export class ListAllUserTrailsFromUserService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,
  ) {}

  async execute(user_id: string): Promise<IUserTrail[]> {
    const trails = await this.userTrailsRepository.findAllUserTrails(user_id);

    return trails;
  }
}
