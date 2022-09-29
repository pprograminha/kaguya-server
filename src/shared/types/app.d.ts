type Maybe<T = null> = T | null | undefined;
type AsyncMaybe<T> = Promise<Maybe<T>>;

export { Maybe, AsyncMaybe };
