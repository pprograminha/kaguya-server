import { ValidateTokenService } from '@modules/users/services/validate-token-service';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export class ValidateTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { authorization } = request.headers;

    const validateToken = container.resolve(ValidateTokenService);

    const validated = await validateToken.execute(authorization);

    return response.status(200).json({
      validated,
    });
  }
}
