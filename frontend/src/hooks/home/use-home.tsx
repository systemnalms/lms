import { useRouter } from "next/navigation";
import { services } from "./contants";

export default function useHome() {
  const router = useRouter();
  
  return {
    services,
    router
  };
}