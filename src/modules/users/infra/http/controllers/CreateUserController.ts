import { CreateUserService } from '@modules/users/services/CreateUserService';
import { instanceToInstance } from '@shared/helpers/instanceToInstance';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, username, name, password, role } = request.body;
    const creator_id = request.user && request.user.id;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      name,
      username,
      password,
      role,
      creator_id,
    });

    return response.status(201).json(instanceToInstance('user', user));
  }
}

export { CreateUserController };
