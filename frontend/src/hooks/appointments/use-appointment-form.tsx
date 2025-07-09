'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { postClient, patchClient } from '@/lib/fetchClient';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export const appointmentSchema = z.object({
  id: z.string().optional(),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  dentist: z.string().min(1, 'Dentist is required'),
  service: z.string().min(1, 'Service is required'),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']),
});

export type Appointment = z.infer<typeof appointmentSchema>;

export function useAppointmentForm(initialData?: Appointment | null) {
  const form = useForm<Appointment>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      service: '',
      date: '',
      time: '',
      dentist: '',
      status: AppointmentStatus.PENDING,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const submitAppointment = async (data: Appointment) => {
    const payload = {
      service: data.service,
      date: data.date,
      time: data.time,
      dentist: data.dentist,
      status: data.status,
    };

    if (initialData && initialData.id) {
      return patchClient<Appointment>(`/appointments/${initialData.id}`, payload);
    } else {
      return postClient<Appointment>('/appointments', payload);
    }
  };

  return {
    ...form,
    submitAppointment,
  };
}
