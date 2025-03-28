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
  day: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  startHour: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  finishHour: Date;

  @IsNotEmpty()
  @IsUUID()
  petId: string;

  @IsOptional()
  @IsUUID()
  employeeId?: string;
}
