"use client";

import { Button } from "@/components/ui"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import useBooking from "@/hooks/booking/use-booking";

export function BookingBreadcrumbs() {
  const { selectedDate, setActiveForm } = useBooking();

  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button
              className="bg-transparent text-white hover:bg-white/10 shadow-none p-1 cursor-pointer"
              onClick={() => setActiveForm("calendar")}
            >
              Calendar
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white" />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button
              className="bg-transparent text-white hover:bg-white/10 shadow-none p-1 cursor-pointer"
              onClick={() => setActiveForm("form")}
              disabled={!selectedDate}
            >
              Appointment Details
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
