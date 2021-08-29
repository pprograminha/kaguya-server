import { User } from '@modules/users/infra/typeorm/entities/User';
// payload: string | object, secret_key: string, options: object | undefined,
export interface ITokenProvider {
  signIn(user: User): string;
}
