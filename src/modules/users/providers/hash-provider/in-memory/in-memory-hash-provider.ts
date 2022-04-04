import { IHashProvider } from '../models/hash-provider';

class InMemoryHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
export { InMemoryHashProvider };
