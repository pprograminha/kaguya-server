import { Left, Right } from './index';

export type Either<L, A, P = true> = P extends true
  ? Promise<Left<L, A> | Right<L, A>>
  : Left<L, A> | Right<L, A>;
