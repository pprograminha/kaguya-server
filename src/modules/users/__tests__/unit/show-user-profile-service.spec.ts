import { ShowUserProfileService } from '@modules/users/services/show-user-profile-service';
import { AppError } from '@shared/errors/app-error';

import { InMemoryRolesRepository } from '@modules/roles/__tests__/in-memory/in-memory-roles-repository';
import { InMemoryUsersRepository } from '../in-memory/in-memory-users-repository';
import { InMemoryUserRolesRepository } from '../in-memory/in-memory-user-roles-repository';

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUserRolesRepository: InMemoryUserRolesRepository;
let inMemoryRolesRepository: InMemoryRolesRepository;
let showUserProfile: ShowUserProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUserRolesRepository = new InMemoryUserRolesRepository();
    inMemoryRolesRepository = new InMemoryRolesRepository();

    showUserProfile = new ShowUserProfileService(inMemoryUsersRepository);
  });

  it('show the user profile', async () => {
    const userCreated = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxxxxxx',
    });

    const role = await inMemoryRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userRole = await inMemoryUserRolesRepository.addRoleToUser(
      userCreated.id,
      role.id,
    );

    userRole.role = role;

    userCreated.user_roles = [userRole];

    const userWhoMadeRequest = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxx',
    });

    const userWhoMadeRequestRole =
      await inMemoryUserRolesRepository.addRoleToUser(
        userWhoMadeRequest.id,
        role.id,
      );

    userWhoMadeRequestRole.role = role;

    userWhoMadeRequest.user_roles = [userWhoMadeRequestRole];

    const user = await showUserProfile.execute({
      user_id: userWhoMadeRequest.id,
      username: userCreated.username,
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userCreated.email);
  });

  it('show the user profile without username', async () => {
    const role = await inMemoryRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userWhoMadeRequest = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxx',
    });

    const userWhoMadeRequestRole =
      await inMemoryUserRolesRepository.addRoleToUser(
        userWhoMadeRequest.id,
        role.id,
      );

    userWhoMadeRequestRole.role = role;

    userWhoMadeRequest.user_roles = [userWhoMadeRequestRole];

    const user = await showUserProfile.execute({
      user_id: userWhoMadeRequest.id,
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userWhoMadeRequest.email);
  });

  it('does not show user profile because the user does not exist', async () => {
    const userWhoMadeRequest = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxx',
    });

    const role = await inMemoryRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userRole = await inMemoryUserRolesRepository.addRoleToUser(
      userWhoMadeRequest.id,
      role.id,
    );

    userRole.role = role;

    userWhoMadeRequest.user_roles = [userRole];

    await expect(
      showUserProfile.execute({
        user_id: userWhoMadeRequest.id,
        username: 'non-existing-username',
      }),
    ).rejects.toEqual(
      new AppError(
        "Can't possible to show user profile because this username does not exist in the database",
        403,
      ),
    );
  });

  it('does not show user profile because the user who made the request does not exist', async () => {
    const user = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxx',
    });

    await expect(
      showUserProfile.execute({
        user_id: 'non-existing-user',
        username: user.username,
      }),
    ).rejects.toEqual(
      new AppError('User who made the request does not exist', 401),
    );
  });

  it('does not show the profile of the highest hierarchy user', async () => {
    const userCreated = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxxxxxx',
    });

    const role = await inMemoryRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userRole = await inMemoryUserRolesRepository.addRoleToUser(
      userCreated.id,
      role.id,
    );

    userRole.role = role;

    userCreated.user_roles = [userRole];

    const userWhoMadeRequest = await inMemoryUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxx',
    });
    const userWhoMadeRequestRoleCreated = await inMemoryRolesRepository.create({
      name: 'sub-admin',
      permission: 1,
    });

    const userWhoMadeRequestRole =
      await inMemoryUserRolesRepository.addRoleToUser(
        userWhoMadeRequest.id,
        userWhoMadeRequestRoleCreated.id,
      );

    userWhoMadeRequestRole.role = userWhoMadeRequestRoleCreated;

    userWhoMadeRequest.user_roles = [userWhoMadeRequestRole];

    await expect(
      showUserProfile.execute({
        user_id: userWhoMadeRequest.id,
        username: userCreated.username,
      }),
    ).rejects.toEqual(
      new AppError('You do not have permission to access', 409),
    );
  });
});
