import { ITokenProvider } from '../models/itoken-provider';

export class InMemoryTokenProvider implements ITokenProvider {
  private token: string;

  verify(token: string): void {
    if (token !== this.token) {
      throw new Error('Invalid token');
    }
  }

  generate(): string {
    this.token = 'fake-token';

    return 'fake-token';
  }
}
