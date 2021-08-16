import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IResponse {
  users: IUser[];
  usersCount: number;
}

export class ListAllUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(): Promise<IResponse> {
    const users = await this.usersRepository.findAll();

    const usersCount = users.length;

    return {
      users,
      usersCount,
    };
  }
}
