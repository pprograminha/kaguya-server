import { inject, injectable } from '@shared/container';
import { ITokenProvider } from '../providers/TokenProvider/models/itoken-provider';

@injectable()
class ValidateTokenService {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute(authorization?: string): Promise<boolean> {
    if (!authorization) return false;

    const [, token] = authorization.split(' ');

    if (!token) return false;

    try {
      this.tokenProvider.verify(token);

      return true;
    } catch {
      return false;
    }
  }
}

export { ValidateTokenService };
