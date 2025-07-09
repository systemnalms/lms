'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type TSortDirection = 'asc' | 'desc' | null;

export type Appointment = {
  id: string;
  date: string;
  time: string;
  patient: string;
  dentist: string;
  status: string;
};

type AppointmentContextType = {
  page: number | null;
  setPage: React.Dispatch<React.SetStateAction<number | null>>;
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
  sortKey: string | null;
  setSortKey: React.Dispatch<React.SetStateAction<string | null>>;
  sortDirection: TSortDirection;
  setSortDirection: React.Dispatch<React.SetStateAction<TSortDirection>>;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editing: Appointment | null;
  setEditing: React.Dispatch<React.SetStateAction<Appointment | null>>;
  deleting: Appointment | null;
  setDeleting: React.Dispatch<React.SetStateAction<Appointment | null>>;
  deleteOpen: boolean;
  setDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<number | null>(1);
  const [search, setSearch] = useState<string | null>('');
  const [sortKey, setSortKey] = useState<string | null>('id');
  const [sortDirection, setSortDirection] = useState<TSortDirection>('asc');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [deleting, setDeleting] = useState<Appointment | null>(null);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <AppointmentContext.Provider
      value={{
        page,
        setPage,
        search,
        setSearch,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        dialogOpen,
        setDialogOpen,
        editing,
        setEditing,
        deleting,
        setDeleting,
        deleteOpen,
        setDeleteOpen,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointmentContext must be used within a AppointmentProvider');
  }
  return context;
}
