import { injectable } from 'tsyringe';
import { verify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';

@injectable()
class ValidateTokenService {
  async execute(authorization?: string): Promise<boolean> {
    if (!authorization) return false;

    const [, token] = authorization.split(' ');

    if (!token) return false;

    try {
      verify(token, authConfig.secret);

      return true;
    } catch {
      return false;
    }
  }
}

export { ValidateTokenService };
