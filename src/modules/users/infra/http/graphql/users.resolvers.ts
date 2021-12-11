import { FiltersDTO } from '@modules/trails/domain/repositories/ITrailsRepository';
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
    listAllUsers: async (
      _: any,
      { input: { order, skip, take } }: { input: FiltersDTO },
    ): Promise<IUser[]> => {
      const listAllUsers = container.resolve(ListAllUsersService);
      const users = listAllUsers.execute({ order, skip, take });

      return users;
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
