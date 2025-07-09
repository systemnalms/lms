'use client';

import { useCallback } from "react";
import { dentists, services } from "./constants";
import { useBookingContext } from "@/context/booking-context";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { BookingForm, BookingFormErrors } from "./types";

export default function useBooking() {
  const {
    activeForm,
    setActiveForm,
    selectedDentistId, 
    setSelectedDentistId, 
    selectedDate, 
    setSelectedDate,
    form,
    setForm,
    errors,
    setErrors
  } = useBookingContext();

  const selectedDentist = dentists.find(d => d.id === selectedDentistId);
  const availableDates = selectedDentist?.availableDates ?? [];
  const router = useRouter();

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return (
      normalized >= today &&
      availableDates.some(
        available =>
          available.getFullYear() === normalized.getFullYear() &&
          available.getMonth() === normalized.getMonth() &&
          available.getDate() === normalized.getDate()
      )
    );
  };

  const onSelectDentist = useCallback((value: string | number) => {
    setSelectedDate(null);
    setSelectedDentistId(value);
  }, [setSelectedDate, setSelectedDentistId])

  // Zod validation schema
  const BookingSchema = z.object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(7, "Phone number too short"),
    service: z.string().min(1, "Please select a service"),
    time: z.string().min(1, "Time is required"),
    notes: z.string().optional(),
  });

  const handleChange = (key: keyof BookingForm, value: string) => {
    setForm((prev: BookingForm) => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = BookingSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: BookingFormErrors = {};
      result.error.errors.forEach(err => {
        const path = err.path[0] as keyof typeof form;
        fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Submit booking
    console.log("Booking Data:", form);
    alert("Appointment booked!");
    router.push("/");
  };

  return {
    router,
    dentists,
    services,
    selectedDentistId,
    setSelectedDentistId,
    selectedDate,
    setSelectedDate,
    isDateAvailable,
    selectedDentist,
    onSelectDentist,
    BookingSchema,
    form,
    setForm,
    errors,
    setErrors,
    handleChange,
    handleSubmit,
    activeForm,
    setActiveForm,
  };
}