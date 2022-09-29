import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUsersRepository } from '../domain/repositories/users-repository';

type RemoveUserRequestDTO = {
  user_id: string;
};

@injectable()
class RemoveUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: RemoveUserRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Unable to remove user', 23, 400);
    }

    await this.usersRepository.destroy(user.id);
  }
}

export { RemoveUserService };
