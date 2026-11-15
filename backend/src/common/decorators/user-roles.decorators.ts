import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../generated/prisma/enums.js';

export const USER_ROLE_KEY = 'user_roles';

export const SystemRoles = (...roles: UserRole[]) =>
  SetMetadata(USER_ROLE_KEY, roles);