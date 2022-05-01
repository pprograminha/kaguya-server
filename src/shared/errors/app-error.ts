class AppError {
  constructor(
    public readonly message: string,
    public readonly genericCode: number = 12,
    public readonly statusCode: number = 400,
  ) {}
}

export { AppError };
