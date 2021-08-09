import { AppError } from '@shared/errors/AppError';
import { User } from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import { BCryptHashProvider } from '../providers/HashProvider/implementations/BCryptHashProvider';
import { JwtProvider } from '../providers/TokenProvider/implementations/JwtProvider';

interface IRequest {
  email: string;
  password?: string;
}

interface IResponse {
  user: User;
  token: string;
}

export class AuthenticateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private hashProvider: BCryptHashProvider,
    private tokenProvider: JwtProvider
  ) {}

  async exeucte({email, password}: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    
    if(!user) {
      throw new AppError('User does not exist');
    };

    const passwordMatched = this.hashProvider.compareHash(String(password), user.password);

    if(!passwordMatched || !user.email) {
      throw new AppError('Incorrect email/password combination.');
    };

    const token = this.tokenProvider.signIn(user);

    return {
      token,
      user
    };
  }
}