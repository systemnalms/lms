'use client';

import Autoplay from "embla-carousel-autoplay";
import useHome from "@/hooks/home/use-home";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
  
export function ServicesCarousel() {
  const { services, router } = useHome();

  return (
    <>
      <div className="flex flex-col justify-center space-y-10">
        <Carousel 
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {services.map((service, idx) => (
              <CarouselItem key={idx} className="basis-full">
                <div className="p-6 md:p-8 bg-white/20 border border-white/20 backdrop-blur rounded-lg h-full flex flex-col justify-between min-h-[320px]">
                  <div>
                    <h4 className="text-2xl sm:text-3xl font-bold mb-4">
                      {service.title}
                    </h4>
                    <p className="text-lg sm:text-xl text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/booking")}
                    className="mt-6 px-6 py-3 bg-black hover:bg-black/20 cursor-pointer transition text-white text-base font-medium rounded-md w-fit"
                  >
                    Book this Service
                  </button>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}