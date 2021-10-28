import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(username: string): Promise<IUser> {
    const user = await this.usersRepository.findByUsername(username);

    if (!user) throw new AppError('This user does not exist', 403);

    return user;
  }
}

export { ShowUserProfileService };
