import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtModule } from './jwt/jwt.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PetshopModule } from './petshop/petshop.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule,
    UserModule,
    AuthModule,
    PetshopModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
