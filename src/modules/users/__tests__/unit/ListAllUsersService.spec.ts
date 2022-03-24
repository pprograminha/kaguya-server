import { IUser } from '@modules/users/domain/entities/IUser';
import { FakeUsersRepository } from '@modules/users/__tests__/fakes/FakeUsersRepository';
import { ListAllUsersService } from '@modules/users/services/ListAllUsersService';

let fakeUsersRepository: FakeUsersRepository;

let listAllUsers: ListAllUsersService;

describe('ListAllUsers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllUsers = new ListAllUsersService(fakeUsersRepository);
  });

  it('should be able to list all users', async () => {
    const arrayOfNumbers = Array.from(
      {
        length: 5,
      },
      (value, key) => key + 1,
    );

    let lastestUser: IUser = {} as IUser;

    const promises = arrayOfNumbers.map(async () => {
      const user = await fakeUsersRepository.create({
        name: 'xxxxx xxxxx',
        email: 'xxxxx@xxxxx.xxxxx',
        password: 'xxxxxxxx',
        username: 'xxxxx',
      });

      lastestUser = user;
    });
    const users = await listAllUsers.execute({
      order: 'desc',
    });

    await Promise.all(promises);

    expect(users).toEqual(expect.arrayContaining([lastestUser]));
  });
});
