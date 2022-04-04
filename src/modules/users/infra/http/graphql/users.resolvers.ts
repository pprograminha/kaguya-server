import { FiltersDTO } from '@modules/trails/domain/repositories/trails-repository';
import { IUser } from '@modules/users/domain/entities/iuser';
import { CreateUserRequestDTO } from '@modules/users/dtos/create-user-request-dto';
import { CreateUserService } from '@modules/users/services/create-user-service';
import { ListAllUsersService } from '@modules/users/services/list-all-users-service';
import { container } from 'tsyringe';

type GraphQLCreateUser = {
  input: CreateUserRequestDTO;
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
