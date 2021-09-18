import { ITokenProvider } from '../models/ITokenProvider';

export class FakeTokenProvider implements ITokenProvider {
  signIn(): string {
    return 'fake-custom-token';
  }
}
