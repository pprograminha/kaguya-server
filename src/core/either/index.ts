/* eslint-disable */
import { Either as EitherT } from './types';

export class Left<L, A> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }

  isLeft(): this is Left<L, A> {
    return true
  }

  isRight(): this is Right<L, A> {
    return false
  }
}
export class Right<L, A> {
  readonly value: A

  constructor(value: A) {
    this.value = value
  }

  isLeft(): this is Left<L, A> {
    return false
  }

  isRight(): this is Right<L, A> {
    return true
  }
}
export class Either {
  static left<L, A>(l: L): EitherT<L, A, false> {
    return new Left<L, A>(l)
  }
  static right<L, A>(a: A): EitherT<L, A, false> {
    return new Right<L, A>(a)
  }
}
