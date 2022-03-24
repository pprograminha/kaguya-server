import { inject, injectable } from '@shared/container';
import { IUserTrail } from '../domain/entities/IUserTrail';
import { IUserTrailsRepository } from '../domain/repositories/IUserTrailsRepository';
import { ListAllUserTrailsFromUserRequestDTO } from '../dtos/ListAllUserTrailsFromUserRequestDTO';

@injectable()
export class ListAllUserTrailsFromUserService {
  constructor(
    @inject('UserTrailsRepository')
    private userTrailsRepository: IUserTrailsRepository,
  ) {}

  async execute({
    user_id,
    user = false,
  }: ListAllUserTrailsFromUserRequestDTO): Promise<IUserTrail[]> {
    const trails = await this.userTrailsRepository.findAllUserTrails(
      user_id,
      (user && {
        user: true,
      }) ||
        undefined,
    );

    return trails;
  }
}
