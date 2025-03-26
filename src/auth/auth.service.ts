import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/repositories/user.repository';
import { JwtService } from '../jwt/jwt.service';
import { RegisterDto } from '../user/dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthEntity } from './entities/auth.entity';
import { RoleEnum } from '../enums/role.enum';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<AuthEntity> {
    const user = await this.userRepository.findByUsername(data.username);

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Usuário e(ou) senha inválido(s)!');
    }

    return this.jwtService.createToken(user);
  }

  async register(body: RegisterDto): Promise<UserEntity> {
    if (
      (await this.userRepository.findByUsername(body.username)) ||
      (await this.userRepository.findByEmail(body.email))
    ) {
      throw new BadRequestException(
        'Nome de usuário ou e-mail já cadastrado no sistema!',
      );
    }

    const { confirmPassword, ...data } = body;

    if (confirmPassword !== body.password) {
      throw new BadRequestException('As senhas não conferem!');
    }

    const hashPass = bcrypt.hashSync(body.password, 12);

    return this.userRepository.create({
      ...data,
      password: hashPass,
      isRoot: false,
      role: RoleEnum.LEVEL_1,
    });
  }
}
