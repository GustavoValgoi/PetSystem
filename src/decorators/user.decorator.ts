/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const UserParam = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      if (filter) {
        return { [filter]: request.user[filter] };
      } else {
        return request.user;
      }
    } else {
      throw new NotFoundException(
        'User not found on request. Use AuthGuard in this route.',
      );
    }
  },
);
