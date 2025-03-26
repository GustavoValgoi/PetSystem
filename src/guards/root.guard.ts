import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserDto } from '../user/dtos/user.dto';

@Injectable()
export class RootGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user }: { user: UserDto } = context.switchToHttp().getRequest();

    return user.isRoot;
  }
}
