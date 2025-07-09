import type { Metadata } from "next";
import { BookingCore } from "@/components/core/booking";
import { BookingProvider } from "@/context/booking-context";

export const metadata: Metadata = {
  title: "Booking | Dental Office Online Scheduling System",
  description: "Booking page for the Dental Office Online Scheduling System",
};

export default function Home() {
  return (
    <BookingProvider>
      <BookingCore />
    </BookingProvider>
  );
}
