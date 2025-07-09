import Image from "next/image";
import { About } from "./About";
import { ServicesCarousel } from "./Carousel";

export function HomeCore() {
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
          <About />
          <ServicesCarousel />
        </div>
      </div>
    </section>
  );
}