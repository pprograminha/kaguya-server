import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ListTheUsersAssociatedWithTheTrailRequestDTO } from '../dtos/ListTheUsersAssociatedWithTheTrailRequestDTO';

@injectable()
export class ListTheUsersAssociatedWithTheTrailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    trail_id,
    order = 'asc',
    skip,
    take,
  }: ListTheUsersAssociatedWithTheTrailRequestDTO): Promise<IUser[]> {
    const users = await this.usersRepository.findAllUsersAssociatedWithTheTrail(
      {
        trail_id,
        order,
        skip,
        take,
      },
    );

    return users;
  }
}
