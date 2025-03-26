import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RegisterDto } from './register.dto';
import { $Enums } from '@prisma/client';

export class CreateUserDto extends RegisterDto {
  @IsNotEmpty()
  @IsBoolean()
  isRoot: boolean;

  @IsNotEmpty()
  @IsEnum($Enums.Role)
  role: $Enums.Role;

  @IsOptional()
  @IsString()
  petshopId?: string;
}
