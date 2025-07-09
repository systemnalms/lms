'use client';

import {
  Input,
  Label,
  Textarea,
  Button,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookingBreadcrumbs } from "./Breadcrumbs";
import { postClient } from "@/lib/fetchClient";
import { useAuth } from "@/hooks/use-auth"; // Make sure this hook is available

type FormState = {
  service: string;
  date: string;
  time: string;
  dentist: string;
  notes: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  service: "",
  date: "",
  time: "",
  dentist: "",
  notes: "",
};

export default function Form() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useAuth(); // gets user from localStorage JWT

  const services = ["Cleaning", "Checkup", "Filling", "Braces", "Extraction"];

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!form.service) newErrors.service = "Service is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time is required";
    if (!form.dentist) newErrors.dentist = "Dentist name is required";
    return newErrors;
  };

  const handleChange = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      await postClient("/appointments", form);
      toast.success("Appointment booked successfully!");
      setForm(initialForm);
      router.push("/dashboard/appointments");
    } catch (err: any) {
      toast.error("Booking failed", {
        description: err?.message || "Unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  // Optional redirect if not authenticated
  if (!user) return <p className="text-white text-center">Please log in to book an appointment.</p>;

  return (
    <section className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl shadow-lg border border-white/20 rounded-2xl bg-white/20 backdrop-blur p-10">
        <BookingBreadcrumbs />

        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-white">
          Book an Appointment
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service */}
            <div className="space-y-2">
              <Label htmlFor="service" className="text-white">Service</Label>
              <Select value={form.service} onValueChange={val => handleChange("service", val)}>
                <SelectTrigger className="w-full bg-white/20 border border-white/20 backdrop-blur rounded-md">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && <p className="text-sm text-red-500">{errors.service}</p>}
            </div>

            {/* Dentist */}
            <div className="space-y-2">
              <Label htmlFor="dentist" className="text-white">Dentist</Label>
              <Input
                id="dentist"
                value={form.dentist}
                onChange={e => handleChange("dentist", e.target.value)}
                className="w-full bg-white/20 border border-white/20 backdrop-blur rounded-md"
              />
              {errors.dentist && <p className="text-sm text-red-500">{errors.dentist}</p>}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={e => handleChange("date", e.target.value)}
                className="w-full bg-white/20 border border-white/20 backdrop-blur rounded-md"
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-white">Time</Label>
              <Input
                id="time"
                type="time"
                value={form.time}
                onChange={e => handleChange("time", e.target.value)}
                className="w-full bg-white/20 border border-white/20 backdrop-blur rounded-md"
              />
              {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white">Additional Notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={e => handleChange("notes", e.target.value)}
              className="w-full bg-white/20 border border-white/20 backdrop-blur rounded-md"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-base bg-black hover:bg-black/20 transition-colors cursor-pointer px-6 py-3"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </form>
      </div>
    </section>
  );
}
