import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create.dto';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
