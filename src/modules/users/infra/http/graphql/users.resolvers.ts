import { IUser } from '@modules/users/domain/entities/IUser';
import { ICreateUserRequestDTO } from '@modules/users/dtos/ICreateUserRequestDTO';
import { CreateUserService } from '@modules/users/services/CreateUserService';
import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';
import { container } from 'tsyringe';

type GraphQLCreateUser = {
  input: ICreateUserRequestDTO;
};
const usersResolvers = {
  Query: {
    listAllUsers: async (): Promise<IUser[]> => {
      const listAllUsers = container.resolve(ListAllUsersService);
      const users = listAllUsers.execute();

      return users;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { input }: GraphQLCreateUser,
    ): Promise<IUser> => {
      const createUser = container.resolve(CreateUserService);

      console.log('called before');
      const user = await createUser.execute(input);
      console.log('user: ', user);

      console.log('called after');

      return user;
    },
  },
};

export default usersResolvers;
