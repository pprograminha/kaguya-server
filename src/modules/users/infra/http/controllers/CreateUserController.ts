import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, permission, role } = request.body;

    const usersRepository = new UsersRepository();
    const bcryptHashProvider = new BCryptHashProvider();

    const createUser = new CreateUserService(
      usersRepository,
      bcryptHashProvider,
    );

    const user = await createUser.execute({
      email,
      name,
      password,
      permission,
      role,
    });

    return response.status(201).json(user);
  }
}

export { CreateUserController };
