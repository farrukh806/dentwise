'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAppointment } from '@/lib/actions/appointments';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import AppointmentSummary from './appointment-summary';

interface IConfirmationStep {
  doctorId: string;
  date: Date;
  time: string;
  type: {
    id: string;
    title: string;
    duration: number;
    price: number;
  };
  onBack: () => void;
}

const ConfirmationStep: React.FC<IConfirmationStep> = ({ doctorId, date, time, type, onBack }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch Doctor Details
  const { data: doctors } = useQuery(doctorQueryOptions);
  const doctor = doctors?.find((d) => d.id === doctorId);

  // Create Appointment Mutation
  const { mutate: confirmBooking, isPending } = useMutation({
    mutationFn: async () => {
      const res = await createAppointment({
        doctorId,
        date,
        time,
        type: type.title,
        duration: type.duration,
        price: type.price,
      });
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientUpcomingAppointments'] });
      queryClient.invalidateQueries({ queryKey: ['patientAppointmentStats'] });
      toast.success('Appointment booked successfully!');
      router.push('/dashboard'); // Redirect to dashboard or success page
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!doctor) return null;

  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-1 pl-0 hover:bg-transparent text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
        <h2 className="text-xl font-bold">Confirm Your Appointment</h2>
      </div>

      {/* Summary Card */}
      <AppointmentSummary doctor={doctor} type={type} date={date} time={time} />

      {/* Actions */}
      <div className="mt-8 flex gap-4">
        <Button variant="outline" onClick={onBack}>
          Modify Appointment
        </Button>
        <Button
          className="bg-primary hover:bg-primary/80 text-white font-semibold min-w-[140px]"
          onClick={() => confirmBooking()}
          disabled={isPending}
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Booking'}
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
