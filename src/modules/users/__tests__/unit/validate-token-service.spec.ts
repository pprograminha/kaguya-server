import '../fakes/FakeUsersRepository';
import { ValidateTokenService } from '@modules/users/services/validate-token-service';
import { InMemoryTokenProvider } from '@modules/users/providers/TokenProvider/in-memory/in-memory-token-provider';

let inMemoryTokenProvider: InMemoryTokenProvider;
let validateToken: ValidateTokenService;

describe('ValidateToken', () => {
  beforeEach(() => {
    inMemoryTokenProvider = new InMemoryTokenProvider();
    validateToken = new ValidateTokenService(inMemoryTokenProvider);
  });

  it('should be able to validate token', async () => {
    const token = inMemoryTokenProvider.generate();

    const validated = await validateToken.execute(`Token ${token}`);

    expect(validated).toBe(true);
  });

  it('should not be able to validate the token because the authozation was not entered', async () => {
    const validated = await validateToken.execute();

    expect(validated).toBe(false);
  });

  it('should not be able to validate the token because it was not entered', async () => {
    const validated = await validateToken.execute('Token ');

    expect(validated).toBe(false);
  });

  it('should not be able to validate the token because it is invalid as default', async () => {
    const validated = await validateToken.execute('Token xxxxxx');

    expect(validated).toBe(false);
  });
});
