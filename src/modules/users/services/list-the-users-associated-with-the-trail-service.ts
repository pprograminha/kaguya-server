import { inject, injectable } from '@shared/container';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/users-repository';
import { ListTheUsersAssociatedWithTheTrailRequestDTO } from '../dtos/list-the-users-associated-with-the-trail-request-dto';

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
