import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { inject, injectable } from '@shared/container';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/users-repository';

@injectable()
export class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ order = 'asc', skip, take }: FiltersDTO): Promise<IUser[]> {
    const users = await this.usersRepository.findAll({
      order,
      skip,
      take,
    });

    return users;
  }
}
