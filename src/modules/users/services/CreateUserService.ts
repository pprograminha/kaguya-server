import { AppError } from '@shared/errors/AppError';
import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { ICreateUserRequestDTO } from '../dtos/ICreateUserRequestDTO';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

class CreateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    email,
    name,
    permission,
    role,
    password,
  }: ICreateUserRequestDTO): Promise<IUser> {
    const checkEmailAlreadyExists = await this.usersRepository.findByEmail(
      email,
    );
    if (checkEmailAlreadyExists) throw new AppError('User already exists', 409);

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      name,
      username: `random${Date.now()}`,
      enabled: true,
      password: hashedPassword,
    });

    return user;
  }
}

export { CreateUserService };
