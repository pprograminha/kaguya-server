import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { ShowUserProfileService } from '@modules/users/services/ShowUserProfileService';
import { AppError } from '@shared/errors/AppError';
import { FakeRolesRepository } from '@modules/roles/__tests__/fakes/FakeRolesRepository';
import { FakeUserRolesRepository } from '../fakes/FakeUserRolesRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserRolesRepository: FakeUserRolesRepository;
let fakeRolesRepository: FakeRolesRepository;
let showUserProfile: ShowUserProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserRolesRepository = new FakeUserRolesRepository();
    fakeRolesRepository = new FakeRolesRepository();

    showUserProfile = new ShowUserProfileService(fakeUsersRepository);
  });

  it('show the user profile', async () => {
    const userCreated = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxxxxxx',
    });

    const role = await fakeRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userRole = await fakeUserRolesRepository.addRoleToUser(
      userCreated.id,
      role.id,
    );

    userRole.role = role;

    userCreated.user_roles = [userRole];

    const userWhoMadeRequest = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxx',
    });

    const userWhoMadeRequestRole = await fakeUserRolesRepository.addRoleToUser(
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
  it('does not show user profile because the user does not exist', async () => {
    const userWhoMadeRequest = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxx',
    });

    await expect(
      showUserProfile.execute({
        user_id: userWhoMadeRequest.id,
        username: 'non-existing-username',
      }),
    ).rejects.toEqual(new AppError('This user does not exist', 403));
  });

  it('does not show user profile because the user who made the request does not exist', async () => {
    const user = await fakeUsersRepository.create({
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
    const userCreated = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxxxxxx',
    });

    const role = await fakeRolesRepository.create({
      name: 'admin',
      permission: 0,
    });

    const userRole = await fakeUserRolesRepository.addRoleToUser(
      userCreated.id,
      role.id,
    );

    userRole.role = role;

    userCreated.user_roles = [userRole];

    const userWhoMadeRequest = await fakeUsersRepository.create({
      email: 'xxxxxx@xxxx.xxx',
      name: 'Xxxx Xxxx',
      password: 'xxxxxxx',
      username: 'xxxxxxxxxx',
    });
    const userWhoMadeRequestRoleCreated = await fakeRolesRepository.create({
      name: 'sub-admin',
      permission: 1,
    });

    const userWhoMadeRequestRole = await fakeUserRolesRepository.addRoleToUser(
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
