import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from '@shared/container';
import { Maybe } from '@shared/types/app';
import { IUser } from '../domain/entities/iuser';
import { IUsersRepository } from '../domain/repositories/iusers-repository';
import { IShowUserProfileRequestDTO } from '../dtos/IShowUserProfileRequestDTO';

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    username,
    user_id,
  }: IShowUserProfileRequestDTO): Promise<IUser> {
    let user: Maybe<IUser>;

    if (username) {
      user = await this.usersRepository.findByUsername(username, {
        user_roles: true,
      });

      if (!user) {
        throw new AppError(
          "Can't possible to show user profile because this username does not exist in the database",
          403,
        );
      }
    }
    const userWhoMadeRequest = await this.usersRepository.findById(user_id, {
      user_roles: true,
    });

    if (!userWhoMadeRequest)
      throw new AppError('User who made the request does not exist', 401);

    const hasGreaterPermission = !!user?.user_roles.some(
      user_role => user_role.role.permission === 0,
    );

    const userWhoMadeRequestHasHighestPermission =
      userWhoMadeRequest.user_roles.some(
        user_role => user_role.role.permission === 0,
      );

    if (hasGreaterPermission && !userWhoMadeRequestHasHighestPermission)
      throw new AppError('You do not have permission to access', 409);

    return user || userWhoMadeRequest;
  }
}

export { ShowUserProfileService };
