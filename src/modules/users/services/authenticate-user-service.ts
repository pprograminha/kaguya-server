import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/app-error';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/users-repository';
import { IHashProvider } from '../providers/hash-provider/models/hash-provider';
import { ITokenProvider } from '../providers/token-provider/models/token-provider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email, {
      user_roles: true,
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 78, 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 77, 401);
    }

    const token = this.tokenProvider.generate(user);

    return {
      token,
      user,
    };
  }
}
