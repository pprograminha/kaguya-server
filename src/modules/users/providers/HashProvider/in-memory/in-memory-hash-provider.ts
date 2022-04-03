import { IHashProvider } from '../models/ihash-provider';

class InMemoryHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
export { InMemoryHashProvider };
