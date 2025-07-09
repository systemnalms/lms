import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  // ✅ Create appointment for authenticated user
  async create(dto: CreateAppointmentDto, userId: string) {
    const appointment = this.repo.create({ ...dto, userId });
    return this.repo.save(appointment);
  }

  // ✅ Only used for admin or internal TCP call
  async findAll(): Promise<Appointment[]> {
    return this.repo.find();
  }

  // ✅ Fetch by ID (access control should happen in controller)
  async findById(id: string): Promise<Appointment> {
    return this.repo.findOneByOrFail({ id });
  }

  // ✅ Used in HTTP controller with @CurrentUser
  async findByUserId(userId: string): Promise<Appointment[]> {
    return this.repo.find({ where: { userId } });
  }

  // ✅ Admins or ownership-based check should happen in controller
  async update(id: string, dto: UpdateAppointmentDto): Promise<Appointment> {
    await this.repo.update(id, dto);
    return this.repo.findOneByOrFail({ id });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
