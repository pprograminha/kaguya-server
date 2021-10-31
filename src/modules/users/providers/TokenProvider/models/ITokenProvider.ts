import { IUser } from '@modules/users/domain/entities/IUser';

export interface ITokenProvider {
  generate(user: IUser): string;
  verify(token: string): void;
}
