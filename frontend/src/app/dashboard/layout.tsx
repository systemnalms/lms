"use client";

import { AppSidebar } from "@/components/core/dashboard/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardProvider } from "@/context/dashboard-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full h-full flex flex-col px-5">
          <SidebarTrigger className="mt-[84px]" />
          {children}
        </div>
      </SidebarProvider>
    </DashboardProvider>
  );
}
