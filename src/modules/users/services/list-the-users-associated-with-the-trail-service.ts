import { inject, injectable } from '@shared/container';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/iusers-repository';
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
