import {
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  day: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  startHour: string;

  @IsNotEmpty()
  @IsMilitaryTime()
  finishHour: string;

  @IsNotEmpty()
  @IsUUID()
  petId: string;

  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsUUID()
  petshopId: string;
}
