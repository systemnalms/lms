'use client';

import { CoreTable } from '../../Table';
import { Badge } from '@/components/ui/badge';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash } from 'lucide-react';
import FormDialog from './FormDialog';
import DeleteDialog from './DeleteDialog';
import useAppointment from '@/hooks/appointments/use-appointments';

export default function AppointmentsPage() {
  const {
    page,
    setPage,
    setSearch,
    sortKey,
    setSortKey,
    sortDirection,
    setSortDirection,
    perPage,
    filtered,
    paginated,
    dialogOpen,
    setDialogOpen,
    editing,
    // handleCreate,
    handleEdit,
    // handleSubmit,
    handleDeleteClick,
    deleteOpen,
    setDeleteOpen,
    confirmDelete,
    deleting,
    fetchAppointments,
  } = useAppointment();

  return (
    <>
      <FormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={async () => await fetchAppointments()}
        initialData={editing}
      />

      <DeleteDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        itemLabel={deleting?.id}
      />

      <CoreTable
        title="Appointments"
        caption="Upcoming and recent appointments"
        breadcrumbs={[
          {
            label: 'Dashboard',
            href: '/dashboard',
          },
          {
            label: 'Appointments',
            href: '/dashboard/appointments',
          },
        ]}
        columns={['date', 'time', 'dentist', 'status', '']}
        sortable={['date', 'time', 'dentist', 'status']}
        sortKey={sortKey ?? undefined}
        sortDirection={
          sortDirection === 'asc' || sortDirection === 'desc'
            ? sortDirection
            : undefined
        }
        onSortChange={(key, dir) => {
          setSortKey(key);
          setSortDirection(dir);
        }}
        rows={paginated}
        total={filtered.length}
        currentPage={page ?? undefined}
        perPage={perPage}
        onPageChange={setPage}
        onSearchChange={(q) => {
          setSearch(q);
          setPage(1);
        }}
        // actionButton={
        //   <Button onClick={handleCreate} className="gap-2">
        //     <Plus className="w-4 h-4" />
        //     Add Appointment
        //   </Button>
        // }
        renderRow={(appt) => (
          <>
            <TableCell className="px-4 py-3">{appt.date}</TableCell>
            <TableCell className="px-4 py-3">{appt.time}</TableCell>
            <TableCell className="px-4 py-3">{appt.dentist}</TableCell>
            <TableCell className="px-4 py-3">
              <Badge
                variant={
                  appt.status === 'CONFIRMED'
                    ? 'default'
                    : appt.status === 'PENDING'
                    ? 'secondary'
                    : 'destructive'
                }
                className="capitalize"
              >
                {appt.status}
              </Badge>
            </TableCell>
            <TableCell className="px-4 py-3 text-right">
              <div className="inline-flex items-center gap-2">
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                  aria-label="Edit"
                  onClick={() => handleEdit(appt)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                  aria-label="Delete"
                  onClick={() => handleDeleteClick(appt)}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </TableCell>
          </>
        )}
      />
    </>
  );
}
