import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
export class ListAllUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(): Promise<IUser[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
