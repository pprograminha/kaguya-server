import { IUser } from '@modules/users/domain/entities/iuser';
import { InMemoryUsersRepository } from '@modules/users/__tests__/in-memory/in-memory-users-repository';
import { ListAllUsersService } from '@modules/users/services/list-all-users-service';

let inMemoryUsersRepository: InMemoryUsersRepository;

let listAllUsers: ListAllUsersService;

describe('ListAllUsers', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    listAllUsers = new ListAllUsersService(inMemoryUsersRepository);
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
      const user = await inMemoryUsersRepository.create({
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
