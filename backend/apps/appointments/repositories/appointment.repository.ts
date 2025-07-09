import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from '../entities/appointment.entity';

@Injectable()
export class AppointmentRepository {
  constructor(
    @InjectRepository(Appointment)
    private readonly repo: Repository<Appointment>,
  ) {}

  async createAppointment(data: Partial<Appointment>) {
    const appointment = this.repo.create(data);
    return this.repo.save(appointment);
  }

  async updateAppointment(id: string, data: Partial<Appointment>) {
    const result = await this.repo.update(id, data);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return this.repo.findOneByOrFail({ id });
  }

  async deleteAppointment(id: string) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return { deleted: true };
  }

  async findById(id: string) {
    const appointment = await this.repo.findOneBy({ id });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async findAll() {
    return this.repo.find();
  }

  async findByUserId(userId: string) {
    return this.repo.find({
      where: { userId },
      order: { date: 'ASC', time: 'ASC' }, // optional: for better UI sort
    });
  }
}
