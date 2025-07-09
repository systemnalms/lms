"use client";

import Image from "next/image";
import { Calendar } from "./Calendar";
import { BookingContents } from "./Contents";
import Form from "./Form";
import useBooking from "@/hooks/booking/use-booking";

export function BookingCore() {
  const { activeForm } = useBooking();

  return (
    <section
      className="relative w-full min-h-[100dvh]"
    >
      <Image
        src="/images/dental-clinic-min.jpg"
        alt="Exterior of BrightSmile Dental Clinic"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-6 overflow-y-auto touch-pan-y">
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-16 text-white py-10 h-full">
          <BookingContents />
          {activeForm === "calendar" ? (<Calendar />) : (<Form />)}
        </div>
      </div>
    </section>
  );
}