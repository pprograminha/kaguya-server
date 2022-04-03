import { inject, injectable } from '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/iusers-repository';
import { IHashProvider } from '../providers/HashProvider/models/ihash-provider';
import { ITokenProvider } from '../providers/TokenProvider/models/itoken-provider';

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
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = this.tokenProvider.generate(user);

    return {
      token,
      user,
    };
  }
}
