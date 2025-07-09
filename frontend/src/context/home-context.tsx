'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type HomeContextType = {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function HomeProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <HomeContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error('useHomeContext must be used within a HomeProvider');
  }
  return context;
}
