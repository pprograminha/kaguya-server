import { IUser } from '@modules/users/domain/entities/iuser';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider';

type UpdateUserRequestDTO = {
  user_id: string;
  name?: string;
  username?: string;
  password?: string;
};

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    username,
    password,
  }: UpdateUserRequestDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User does not exist', 5, 401);

    if (username) {
      const checkUsernameAlreadyExists =
        await this.usersRepository.findByUsername(username);

      if (checkUsernameAlreadyExists && user.username !== username)
        throw new AppError('Username already exists', 5, 400);

      user.username = username;
    }

    user.name = name || user.name;

    if (password) {
      const hashedPassword = await this.hashProvider.generateHash(password);

      user.password = hashedPassword;
    }

    await this.usersRepository.save(user);

    return user;
  }
}
