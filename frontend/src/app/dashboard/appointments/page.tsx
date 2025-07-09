import AppointmentsCore from "@/components/core/dashboard/appointments";
import { AppointmentProvider } from "@/context/appointment-context";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appointments | Dental Office Online Scheduling System",
  description: "Manage your appointments efficiently with our online scheduling system.",
};

export default function AppointmentsPage() {
  return (
    <AppointmentProvider>
      <AppointmentsCore />
    </AppointmentProvider>
  );
}