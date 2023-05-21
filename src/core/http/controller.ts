import { HttpResponse } from './http-response';

export interface IController<T> {
  handle(dto: T): Promise<HttpResponse>;
}
