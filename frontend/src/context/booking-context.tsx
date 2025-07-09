'use client';

import { BookingForm, BookingFormErrors } from '@/hooks/booking/types';
import { createContext, useContext, useState, ReactNode } from 'react';

type BookingContextType = {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
  activeForm: string | null;
  setActiveForm: (form: string | null) => void;
  selectedDentistId: string | number | null | undefined;
  setSelectedDentistId: (id: string | number | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  form: BookingForm;
  setForm: React.Dispatch<React.SetStateAction<BookingForm>>;
  errors: BookingFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [activeForm, setActiveForm] = useState<string | null>("calendar");
  const [selectedDentistId, setSelectedDentistId] = useState<string | number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [form, setForm] = useState<BookingForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    service: "",
    time: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});

  return (
    <BookingContext.Provider value={{ 
      selectedService, 
      setSelectedService, 
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
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a BookingProvider');
  }
  return context;
}
