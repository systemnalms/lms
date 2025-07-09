import type { Metadata } from "next";

// import DashboardLayout from "./layout";
import DashboardCore from "@/components/core/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Dental Office Online Scheduling System",
  description: "Manage your dental office operations efficiently with our online dashboard.",
};

export default function DashboardPage() {
  return (
    <DashboardCore />
  );
}