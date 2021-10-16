import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entities/User';

export default async function ensureAdministrator(
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
    relations: ['platform_user_roles', 'platform_user_roles.platform_role'],
  });

  if (!user) throw new AppError('User does not exist', 401);

  const allowed = user.platform_user_roles.find(
    platformUserRole => platformUserRole.platform_role.permission === 0,
  );

  if (!allowed) throw new AppError('Only administrator can access here', 401);

  return next();
}
