'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type DashboardContextType = {
  selectedService: string | null;
  setSelectedService: (service: string | null) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <DashboardContext.Provider value={{ selectedService, setSelectedService }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboardContext must be used within a DashboardProvider');
  }
  return context;
}
