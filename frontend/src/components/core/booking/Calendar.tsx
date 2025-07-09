'use client';

import { Button } from '@/components/ui';
import { Calendar as ShadCalendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import useBooking from '@/hooks/booking/use-booking';
import React from 'react';
import { BookingBreadcrumbs } from './Breadcrumbs';

export function Calendar() {
  const { 
    dentists, 
    selectedDentistId,
    selectedDate, 
    setSelectedDate,
    isDateAvailable,
    onSelectDentist,
    setActiveForm,
  } = useBooking();

  return (
    <section className="flex items-center justify-center px-4">
      <Card className="w-full max-w-xl shadow-lg border border-white/20 rounded-2xl bg-white/20 backdrop-blur p-10 gap-0">
        <BookingBreadcrumbs />
        
        <CardHeader className="text-center space-y-2 mb-10">
          <CardTitle className="text-3xl sm:text-4xl font-bold text-white">
            Select dentist and date
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          <Select
            value={typeof selectedDentistId === 'string' ? selectedDentistId : (selectedDentistId ? String(selectedDentistId) : undefined)}
            onValueChange={(value) => {
              onSelectDentist(value)
            }}
          >
            <SelectTrigger className="w-full max-w-sm bg-white/20 text-white border border-white/20 backdrop-blur rounded-md">
              <SelectValue placeholder="Select Dentist" />
            </SelectTrigger>
            <SelectContent>
              {dentists.map(dentist => (
                <SelectItem key={dentist.id} value={dentist.id}>
                  {dentist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="rounded-md border bg-white p-2 shadow-sm">
            <ShadCalendar
              mode="single"
              required={true}
              selected={selectedDate ?? undefined}
              onSelect={setSelectedDate}
              className="rounded-md"
              disabled={date => !isDateAvailable(date)}
            />
          </div>

          <Button 
              className="w-full text-base bg-black hover:bg-black/20 transition-colors cursor-pointer px-6 py-3"
              onClick={() => setActiveForm("form")}
              disabled={!selectedDate}
            >
            Fill Appointment Details
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
