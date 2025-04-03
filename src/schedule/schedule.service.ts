import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ScheduleRepository } from './repositories/schedule.repository';
import { CreateScheduleDto } from './dto/create.dto';
import { ScheduleEntity } from './entities/schedule.entity';
import { UpdateScheduleDto } from './dto/update.dto';
import { ScheduleDto } from './dto/schedule.dto';
import { formatDateToISOString } from '../utils/format-date.util';
import { IQueryPagination } from '../interfaces/query-pagination.interface';
import { IFindPagination } from '../interfaces/pagination.interface';

@Injectable()
export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async create(body: CreateScheduleDto): Promise<ScheduleEntity> {
    try {
      body.startHour = formatDateToISOString(body.day, body.startHour);
      body.finishHour = formatDateToISOString(body.day, body.finishHour);
      body.day = formatDateToISOString(body.day);

      return this.scheduleRepository.create(body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao cadastrar o agendamento, por favor verifique os dados!',
      );
    }
  }

  async update(id: string, body: UpdateScheduleDto): Promise<ScheduleEntity> {
    try {
      if (body.startHour && body.day) {
        body.startHour = formatDateToISOString(body.day, body.startHour);
      }
      if (body.finishHour && body.day) {
        body.finishHour = formatDateToISOString(body.day, body.finishHour);
      }
      if (body.day) {
        body.day = formatDateToISOString(body.day);
      }

      return this.scheduleRepository.update(id, body);
    } catch {
      throw new BadRequestException(
        'Houve um problema ao salvar o agendamento, por favor verifique os dados!',
      );
    }
  }

  async findById(id: string, petshopId: string): Promise<ScheduleEntity> {
    const schedule = await this.scheduleRepository.findById(id, petshopId);

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado!');
    }

    return schedule;
  }

  async delete(id: string, petshopId: string): Promise<ScheduleEntity> {
    await this.findById(id, petshopId);

    try {
      return this.scheduleRepository.delete(id, petshopId);
    } catch {
      throw new BadRequestException(
        'Houve um erro ao excluir o agendamento, por favor verifique os dados!',
      );
    }
  }

  async findAll(
    petshopId: string,
    query: IQueryPagination,
  ): Promise<IFindPagination<ScheduleDto>> {
    const { data, ...rest } = await this.scheduleRepository.findAll(petshopId, {
      limit: Number(query.limit) || 10,
      page: Number(query.page) || 1,
    });

    return {
      ...rest,
      data: data.length ? data.map(s => new ScheduleDto(s)) : [],
    };
  }
}
