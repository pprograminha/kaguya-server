import { Either } from '@core/either';
import type { Either as EitherT } from '@core/either/types';
import { IUser } from '@modules/users/domain/entities/iuser';
import { IUsersRepository } from '@modules/users/domain/repositories/users-repository';
import { IAuthProvider } from '@modules/users/providers/auth-provider/models/auth-provider';
import { ITokenProvider } from '@modules/users/providers/token-provider/models/token-provider';
import { CreateUserService } from '@modules/users/services/create-user-service';
import crypto from 'node:crypto';

type IAuthenticateUserByProviderResponse = EitherT<
  Error,
  {
    user: IUser;
    token: string;
  }
>;

interface IAuthenticateUserByProviderRequest {
  access_token: string;
}

export class AuthenticateUserByProviderUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private tokenProvider: ITokenProvider,
    private authProvider: IAuthProvider,
    private createUser: CreateUserService,
  ) {}

  async execute({
    access_token,
  }: IAuthenticateUserByProviderRequest): IAuthenticateUserByProviderResponse {
    const userResult = await this.authProvider.getUser(access_token);

    if (userResult.isLeft()) {
      return Either.left(userResult.value);
    }

    const user = userResult.value;

    if (!user) {
      return Either.left(new Error('User does not exist'));
    }

    const authUser = await this.usersRepository.findByUid(user.uid, {
      user_roles: true,
    });

    const parsedUsername =
      user.name
        ?.toLowerCase()
        .trim()
        .replace(/[^a-zà-ÿç\s]+/g, '')
        .replace(/[\s]+/g, '.') || 'user';

    const username = await this.usersRepository.findByUsername(parsedUsername);

    const userData = {
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
      auth_id: user.uid,
      email_verified: user.email_verified,
      phone_number: user.phone_number,
      username: `${parsedUsername}${
        username ? `.${crypto.randomUUID().slice(0, 6)}` : ''
      }`,
    };

    if (!authUser) {
      const { token, user: createdUser } = await this.createUser.execute(
        userData,
      );

      return Either.right({
        token,
        user: createdUser,
      });
    }

    const { username: _, ...userDataRest } = userData;

    Object.assign(authUser, userDataRest);

    await this.usersRepository.save(authUser);

    const token = this.tokenProvider.generate(authUser);

    return Either.right({
      token,
      user: authUser,
    });
  }
}
