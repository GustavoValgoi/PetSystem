import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService as JwtServiceOriginal } from '@nestjs/jwt';
import { UserEntity } from '../user/entities/user.entity';
import { AuthEntity } from '../auth/entities/auth.entity';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtService {
  constructor(private readonly jwtServiceOriginal: JwtServiceOriginal) {}

  createToken(data: UserEntity): AuthEntity {
    const token = this.jwtServiceOriginal.sign(
      {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        root: data.isRoot,
        petshopId: data.petshopId,
      },
      {
        expiresIn: process.env.JWT_EXPIRES,
        issuer: process.env.JWT_ISSUER,
        secret: process.env.JWT_SECRET,
      },
    );

    return { accessToken: token };
  }

  async checkToken(token: string): Promise<JwtPayloadInterface> {
    try {
      const data: JwtPayloadInterface =
        await this.jwtServiceOriginal.verifyAsync(token, {
          issuer: process.env.JWT_ISSUER,
          secret: process.env.JWT_SECRET,
        });

      return data;
    } catch {
      throw new BadRequestException('Invalid Token!');
    }
  }

  async isValidToken(token: string): Promise<boolean> {
    try {
      await this.checkToken(token);
      return true;
    } catch {
      return false;
    }
  }
}
