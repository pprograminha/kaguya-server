import { classToClass } from 'class-transformer';
import { ListAllUserTrailsFromUserService } from '@modules/trails/services/ListAllUserTrailsFromUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllUserTrailsFromUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.query;
    const listAllUserTrailsFromUser = container.resolve(
      ListAllUserTrailsFromUserService,
    );
    const user_logged_id = request.user.id;

    const userTrails = await listAllUserTrailsFromUser.execute(
      (user_id as string) || user_logged_id,
    );

    return response.status(200).json(classToClass(userTrails));
  }
}
