import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entities/User';

export default async function ensureSubAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;

  const usersRepository = getRepository(User);

  const user = await usersRepository.findOne({
    where: {
      id: user_id,
    },
    relations: ['platformUserRoles', 'platformUserRoles.platformRole'],
  });

  if (!user) throw new AppError('User does not exist', 401);

  const allowed = user.platformUserRoles.find(
    platformUserRole => platformUserRole.platformRole.permission <= 1,
  );

  if (!allowed)
    throw new AppError(
      'Only sub-administrator or superior can access here',
      401,
    );

  return next();
}
