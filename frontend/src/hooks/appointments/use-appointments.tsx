'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppointmentContext } from '@/context/appointment-context';
import { getClient, postClient, putClient, deleteClient } from '@/lib/fetchClient';

export type Appointment = {
  id: string;
  service: string;
  date: string;
  time: string;
  dentist: string;
  status: string;
};

export default function useAppointment() {
  const router = useRouter();
  const {
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
  } = useAppointmentContext();

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const perPage = 5;

  const fetchAppointments = async () => {
    try {
      const res = await getClient<{ data: Appointment[] }>('/appointments');
      setAppointments(res.data?.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const sorted = useMemo(() => {
    const copy = [...appointments];
    return copy.sort((a, b) => {
      const aVal = a[sortKey as keyof Appointment];
      const bVal = b[sortKey as keyof Appointment];
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [appointments, sortKey, sortDirection]);

  const filtered = useMemo(() => {
    return sorted.filter((appt) =>
      Object.values(appt).some((value) =>
        value.toLowerCase().includes((search ?? '').toLowerCase())
      )
    );
  }, [sorted, search]);

  const paginated = useMemo(() => {
    const currentPage = page ?? 1;
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const handleCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const handleEdit = (appt: Appointment) => {
    setEditing(appt);
    setDialogOpen(true);
  };

  const handleSubmit = async (data: Appointment) => {
    try {
      if (editing && editing.id) {
        await putClient(`/appointments/${editing.id}`, data);
      } else {
        await postClient('/appointments', data);
      }
      await fetchAppointments();
    } catch (err) {
      console.error('Failed to submit appointment:', err);
    }
  };

  const handleDeleteClick = (appt: Appointment) => {
    setDeleting(appt);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleting) {
      try {
        await deleteClient(`/appointments/${deleting.id}`);
        await fetchAppointments();
      } catch (err) {
        console.error('Failed to delete appointment:', err);
      }
    }
    setDeleteOpen(false);
    setDeleting(null);
  };

  return {
    appointments,
    router,
    page,
    setPage,
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    perPage,
    sorted,
    filtered,
    paginated,
    dialogOpen,
    editing,
    setDialogOpen,
    handleCreate,
    handleEdit,
    handleSubmit,
    handleDeleteClick,
    confirmDelete,
    deleteOpen,
    setDeleteOpen,
    deleting,
    fetchAppointments,
  };
}
