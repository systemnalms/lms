'use client';

export function About() {
  return (
    <>
      <div className="flex flex-col justify-center space-y-10">
        <h2
          id="clinic-banner"
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
        >
          Welcome!
        </h2>
        <p className="text-xl sm:text-2xl lg:text-3xl font-light leading-relaxed">
          Exceptional care in a friendly and professional environment.
        </p>
        <p className="text-lg lg:text-xl text-gray-200 leading-relaxed">
          📍 123 Smile Street, Happy Town
          <br />
          ☎️ (123) 456-7890
          <br />
          🕒 Mon–Fri: 9am – 6pm
        </p>
      </div>
    </>
  );
}
