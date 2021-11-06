import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/entities/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
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
    let user: IUser | undefined;

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
