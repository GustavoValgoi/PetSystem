import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service';
import { UserDto } from '../user/dtos/user.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization }: { authorization: string } = request.headers;
    const reqToken: string | undefined = authorization
      ? authorization.split(' ')[1]
      : undefined;

    if (!reqToken) {
      throw new UnauthorizedException('JWT Token is required.');
    }

    return this.jwtService
      .checkToken(reqToken)
      .then(async data => {
        try {
          request.tokenPayload = data;
          request.user = new UserDto(await this.userService.findById(data.id));

          return true;
        } catch {
          return false;
        }
      })
      .catch(() => false);
  }
}
