import { IUser } from '@modules/users/domain/entities/IUser';
import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { ShowUserProfileService } from '@modules/users/services/ShowUserProfileService';
import { container } from 'tsyringe';

type GraphQLCreateUser = {
  input: ICreateUserRequestDTO;
};
type GraphQLShowUserProfile = {
  username: string;
};
const usersResolvers = {
  Query: {
    listAllUsers: async (): Promise<IUser[]> => {
      const listAllUsers = container.resolve(ListAllUsersService);
      const users = listAllUsers.execute();

      return users;
    },
    showUserProfile: async (
      _: any,
      { username }: GraphQLShowUserProfile,
    ): Promise<IUser> => {
      const showUserProfile = container.resolve(ShowUserProfileService);
      const user = await showUserProfile.execute(username);

      return user;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { input }: GraphQLCreateUser,
    ): Promise<IUser> => {
      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute(input);

      return user;
    },
  },
};

export default usersResolvers;
