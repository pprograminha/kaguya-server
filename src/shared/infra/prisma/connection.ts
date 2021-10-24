/**
 * @jest-environment ./prisma/prisma-environment-jest
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export { prisma };
