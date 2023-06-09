import { AppError } from '@shared/errors/app-error';
import { prisma } from '@shared/infra/prisma/connection';
import { NextFunction, Request, Response } from 'express';

export default async function ensureSubAdministrator(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const user_id = request.user.id;

  const user = await prisma.user.findUnique({
    where: {
      id: user_id,
    },
    include: {
      user_roles: {
        include: {
          role: true,
        },
      },
    },
  });

  if (!user) throw new AppError('User does not exist', 5, 401);

  const allowed = user.user_roles.find(
    userRole => userRole.role.permission <= 1,
  );

  if (!allowed)
    throw new AppError(
      'Only sub-administrator or superior can access here',
      116,
      403,
    );

  return next();
}
