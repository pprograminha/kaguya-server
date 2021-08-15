import { AppError } from '@shared/errors/AppError';
import { IPlatformUserRole } from '../domain/entities/IPlatformUserRole';
import { IUser } from '../domain/entities/IUser';
import { IPlatformUserRolesRepository } from '../domain/repositories/IPlatformUserRolesRepository';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

interface IRequest {
  user_id_logged: string;
}

interface IResponse {
  users: IPlatformUserRole[] | IUser[];
  usersCount: number;
}

export class ListAllUsersService {
  constructor(
    private usersRepository: IUsersRepository,
    private platformUserRolesRepository: IPlatformUserRolesRepository,
  ) {}

  async execute({ user_id_logged }: IRequest): Promise<IResponse> {
    const users = await this.usersRepository.findAll();

    if (!user_id_logged) {
      throw new AppError('User not logged');
    }

    const usersCount = users.length;

    return {
      users,
      usersCount,
    };
  }
}
