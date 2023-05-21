import { Either } from '@core/either/types';
import { Maybe } from '@shared/types/app';

export type User = {
  uid: string;
  email?: string;
  email_verified: boolean;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
};

export type GetUserResponse = Either<Error, Maybe<User>>;

interface IAuthProvider {
  getUser(accessToken: string): GetUserResponse;
}

export { IAuthProvider };
