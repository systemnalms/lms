import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  UseGuards,
  UnauthorizedException,
  Patch,
  Delete,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from './appointment.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { success, created } from 'libs/common/response';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/auth/guards/jwt-auth.guard';
import { Public } from 'apps/auth/decorators/public.decorator';
import { CurrentUser } from 'libs/common/decorators/current-user.decorator';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';

@ApiTags('Appointments')
@ApiBearerAuth()
@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  async create(
    @CurrentUser() user: { id: string },
    @Body() dto: CreateAppointmentDto,
  ) {
    const appointment = await this.appointmentsService.create(dto, user.id);
    return created(appointment, 'Appointment created successfully');
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentsService.findById(id);

    // ✅ Make sure the user owns this appointment
    if (appointment.userId !== user.id) {
      throw new UnauthorizedException(
        'Access denied to update this appointment',
      );
    }

    const updated = await this.appointmentsService.update(id, dto);
    return success(updated, 'Appointment updated successfully');
  }

  @Get()
  async findAll(@CurrentUser() user: { id: string }) {
    const all = await this.appointmentsService.findByUserId(user.id);
    return success(all, 'Your appointments fetched successfully');
  }

  @Get(':id')
  async findById(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    const appointment = await this.appointmentsService.findById(id);
    if (appointment.userId !== user.id) {
      throw new UnauthorizedException('Access denied to this appointment');
    }
    return success(appointment, 'Appointment fetched successfully');
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @CurrentUser() user: { id: string }) {
    const appointment = await this.appointmentsService.findById(id);

    // Ensure only the owner can delete
    if (appointment.userId !== user.id) {
      throw new UnauthorizedException(
        'Access denied to delete this appointment',
      );
    }

    await this.appointmentsService.delete(id);
    return success(null, 'Appointment deleted successfully');
  }

  @Public()
  @Get('health')
  getHealth() {
    return { status: 'ok' };
  }

  // ✅ TCP ROUTES

  @MessagePattern('appointments_create')
  async createTcp(
    @Payload() payload: { dto: CreateAppointmentDto; userId: string },
  ) {
    const createdAppt = await this.appointmentsService.create(
      payload.dto,
      payload.userId,
    );
    return created(createdAppt, 'Appointment created successfully');
  }

  @MessagePattern('appointments_find_by_id')
  async findByIdTcp(@Payload() data: { id: string }) {
    const appointment = await this.appointmentsService.findById(data.id);
    return success(appointment, 'Appointment fetched successfully');
  }

  @MessagePattern('appointments_find_by_user')
  async findByUserTcp(@Payload() data: { userId: string }) {
    const appointments = await this.appointmentsService.findByUserId(
      data.userId,
    );
    return success(appointments, 'Appointments for user fetched successfully');
  }
}
