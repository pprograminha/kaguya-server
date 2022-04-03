import { IUser } from '@modules/users/domain/entities/iuser';

export interface ITokenProvider {
  generate(user: IUser): string;
  verify(token: string): void;
}
