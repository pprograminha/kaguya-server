import { ITokenProvider } from '../models/ITokenProvider';

import { sign } from 'jsonwebtoken';
import { authConfig } from '@config/auth';
import { User } from '@modules/users/infra/typeorm/entities/User';

export class JwtProvider implements ITokenProvider {
  signIn(user: User): string {
    const { secret, expiresIn } = authConfig;

    const token = sign({} , secret, {
      subject: user.id,
      expiresIn
    });

    return token;
  }
};