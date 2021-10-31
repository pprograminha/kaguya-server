import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { ITokenProvider } from '../models/ITokenProvider';

export class JWTokenProvider implements ITokenProvider {
  verify(token: string): void {
    const { secret } = authConfig;

    verify(token, secret);
  }

  generate(user: User): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return token;
  }
}
