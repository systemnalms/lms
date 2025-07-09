import type { Metadata } from "next";
import { HomeCore } from "@/components/core/home";
import { HomeProvider } from "@/context/home-context";

export const metadata: Metadata = {
  title: "Home | Dental Office Online Scheduling System",
  description: "Home page for the Dental Office Online Scheduling System",
};

export default function Home() {
  return (
    <HomeProvider>
      <HomeCore />
    </HomeProvider>
  );
}
