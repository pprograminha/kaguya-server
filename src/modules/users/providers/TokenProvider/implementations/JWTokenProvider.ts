import { sign, verify } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import { IUser } from '@modules/users/domain/entities/IUser';
import { ITokenProvider } from '../models/ITokenProvider';

export class JWTokenProvider implements ITokenProvider {
  verify(token: string): void {
    const { secret } = authConfig;

    verify(token, secret);
  }

  generate(user: IUser): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return token;
  }
}
