'use client';

export function BookingContents() {
  return (
    <div className="flex flex-col justify-center space-y-10">
      <h2
        id="clinic-banner"
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
      >
        Schedule an Appointment
      </h2>
      <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed">
        Book your visit with our dental experts — quick, easy, and stress-free.
      </p>
    </div>
  );
}
