import { Either } from '@core/either';
import { GetUserResponse, IAuthProvider } from '../models/auth-provider';

class InMemoryAuthProvider implements IAuthProvider {
  async getUser(): GetUserResponse {
    return Either.right(null);
  }
}
export { InMemoryAuthProvider };
