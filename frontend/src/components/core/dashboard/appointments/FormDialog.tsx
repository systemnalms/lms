'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppointmentForm, Appointment } from '@/hooks/appointments/use-appointment-form';
import { toast } from 'sonner';
import useAppointment from '@/hooks/appointments/use-appointments';

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Appointment) => void;
  initialData?: Appointment | null;
};

export default function FormDialog({
  open,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const {
    register,
    handleSubmit,
    submitAppointment,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useAppointmentForm(initialData);

  const submitHandler = async (data: Appointment) => {
    try {
      const result = await submitAppointment(data);
      toast.success(initialData ? 'Appointment updated successfully' : 'Appointment created successfully');
      onSubmit?.(result);
      onClose();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to submit appointment');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Appointment' : 'Create Appointment'}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
          <fieldset disabled={isSubmitting} className="space-y-4">

            <div>
              <label className="text-sm font-medium">Service</label>
              <Input
                {...register('service')}
                placeholder="Dental Cleaning, Extraction..."
              />
              {errors.service && <p className="text-sm text-red-500">{errors.service.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <Input
                {...register('date')}
                type="date"
              />
              {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Time</label>
              <Input
                {...register('time')}
                type="time"
              />
              {errors.time && <p className="text-sm text-red-500">{errors.time.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Dentist</label>
              <Input
                {...register('dentist')}
                placeholder="Dr. Smith"
              />
              {errors.dentist && <p className="text-sm text-red-500">{errors.dentist.message}</p>}
            </div>

            <div>
              <label className="text-sm font-medium">Status</label>
              <Select
                defaultValue={watch('status')}
                onValueChange={(val) => setValue('status', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {initialData ? 'Update' : 'Create'}
              </Button>
            </div>
          </fieldset>
        </form>
      </DialogContent>
    </Dialog>
  );
}
