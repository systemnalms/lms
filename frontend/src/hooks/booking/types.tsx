export type BookingForm = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service: string;
  time: string;
  notes?: string;
}

export type BookingFormErrors = Partial<Record<keyof BookingForm, string>>;