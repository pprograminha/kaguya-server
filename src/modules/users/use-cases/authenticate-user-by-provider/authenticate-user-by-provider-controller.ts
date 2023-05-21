import { IController } from '@core/http/controller';
import { badRequest, HttpResponse, ok } from '@core/http/http-response';
import { AuthenticateUserByProviderUseCase } from './authenticate-user-by-provider';

type AuthenticateUserByProviderRequest = {
  access_token: string;
};
export class AuthenticateUserByProviderController
  implements IController<AuthenticateUserByProviderRequest>
{
  constructor(
    private readonly authenticateUserByProvider: AuthenticateUserByProviderUseCase,
  ) {}

  async handle({
    access_token,
  }: AuthenticateUserByProviderRequest): Promise<HttpResponse> {
    const result = await this.authenticateUserByProvider.execute({
      access_token,
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}
