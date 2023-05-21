import { FirebaseAuthProvider } from '@modules/users/providers/auth-provider/implementations/firebase-auth-provider';
import { JWTokenProvider } from '@modules/users/providers/token-provider/implementations/jwt-token-provider';
import { AuthenticateUserByProviderUseCase } from '@modules/users/use-cases/authenticate-user-by-provider/authenticate-user-by-provider';
import { AuthenticateUserByProviderController } from '@modules/users/use-cases/authenticate-user-by-provider/authenticate-user-by-provider-controller';
import { CreateUserService } from '@modules/users/services/create-user-service';
import { BCryptHashProvider } from '@modules/users/providers/hash-provider/implementations/bcrypt-hash-provider';
import { PrismaRolesRepository } from '@modules/roles/infra/prisma/repositories/prisma-roles-repository';
import { PrismaUserRolesRepository } from '@modules/roles/infra/prisma/repositories/prisma-user-roles-repository';
import { PrismaUsersRepository } from '../prisma/prisma-users-repository';

export const makeAuthenticateUserByProviderControllerFactory = () => {
  const usersRepository = new PrismaUsersRepository();
  const authProvider = new FirebaseAuthProvider();
  const rolesRepository = new PrismaRolesRepository();
  const userRolesRepository = new PrismaUserRolesRepository();
  const hashProvider = new BCryptHashProvider();
  const tokenProvider = new JWTokenProvider();

  const createUser = new CreateUserService(
    usersRepository,
    hashProvider,
    rolesRepository,
    userRolesRepository,
    tokenProvider,
  );

  const authenticateUserByProviderUseCase =
    new AuthenticateUserByProviderUseCase(
      usersRepository,
      tokenProvider,
      authProvider,
      createUser,
    );

  const authenticateUserByProviderController =
    new AuthenticateUserByProviderController(authenticateUserByProviderUseCase);

  return authenticateUserByProviderController;
};
