import { classToClass } from 'class-transformer';
import { ListAllTrailsService } from '@modules/trails/services/ListAllTrailsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ListAllTrailsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllTrails = container.resolve(ListAllTrailsService);

    const trails = await listAllTrails.execute();

    return response.status(200).json(classToClass(trails));
  }
}
