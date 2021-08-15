import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { JwtProvider } from '@modules/users/providers/TokenProvider/implementations/JwtProvider';
import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const jwtProvider = new JwtProvider();
    const usersRepository = new UsersRepository();
    const bCryptHashProvider = new BCryptHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      bCryptHashProvider,
      jwtProvider,
    );

    const { token, user } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({
      user,
      token,
    });
  }
}
