import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService';
import { classToClass } from '@shared/helpers/classToClass';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { token, user } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({
      user: classToClass('user', user),
      token,
    });
  }
}
