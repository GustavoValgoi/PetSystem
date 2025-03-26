import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { RegisterDto } from '../user/dtos/register.dto';
import { UserDto } from '../user/dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginDto): Promise<AuthEntity> {
    return this.authService.login(body);
  }

  @Post('/register')
  async register(@Body() body: RegisterDto): Promise<UserDto> {
    return new UserDto(await this.authService.register(body));
  }
}
