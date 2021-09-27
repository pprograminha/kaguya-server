import { IUser } from '@modules/users/domain/entities/IUser';

// payload: string | object, secret_key: string, options: object | undefined,
export interface ITokenProvider {
  signIn(user: IUser): string;
}
