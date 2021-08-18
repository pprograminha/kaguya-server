import { CreateUserService } from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, name, password, role_name } = request.body;
    const admin_id = request.user && request.user.id;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      email,
      name,
      password,
      role_name,
      admin_id,
    });

    return response.status(201).json({ user });
  }
}

export { CreateUserController };
