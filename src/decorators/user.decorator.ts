import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';

export const UserParam = createParamDecorator(
  (filter: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new NotFoundException('Usuário não encontrado na requisição!');
    }

    if (filter) {
      return { [filter]: request.user[filter] };
    }

    const user: UserDto = request.user;

    return user;
  },
);
