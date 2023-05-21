import { IController } from '@core/http/controller';
import { Request, Response } from 'express';

export const adaptRoute = <T>(controller: IController<T>) => {
  return async (request: Request, response: Response): Promise<Response> => {
    const data = {
      ...request.body,
      ...request.query,
      ...request.params,
    };

    const httpResponse = await controller.handle(data);

    return response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};
