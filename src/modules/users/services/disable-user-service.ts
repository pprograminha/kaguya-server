import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUsersRepository } from '../domain/repositories/users-repository';

type DisableUserRequestDTO = {
  user_id: string;
};

@injectable()
class DisableUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: DisableUserRequestDTO): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Unable to disable user', 23, 400);
    }

    user.enabled = false;

    await this.usersRepository.save(user);
  }
}

export { DisableUserService };
