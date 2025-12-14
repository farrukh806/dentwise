'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Loader2, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAppointment } from '@/lib/actions/appointments';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { toast } from 'sonner';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
      <Card className="p-6 max-w-2xl">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Appointment Summary</h3>

        {/* Doctor Info */}
        <div className="flex items-center gap-4 mb-6 p-4 border border-primary/20 rounded-lg bg-primary/5">
          <Image
            src={doctor.imageUrl}
            alt={doctor.name}
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h4 className="font-bold text-lg">{doctor.name}</h4>
            <p className="text-muted-foreground text-sm">{doctor.speciality}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Appointment Type</p>
            <p className="font-medium">{type.title}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Duration</p>
            <p className="font-medium">{type.duration} min</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Date</p>
            <p className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Time</p>
            <p className="font-medium">{time}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Location</p>
            <p className="font-medium">Dental Center</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Cost</p>
            <p className="font-medium text-amber-500">${type.price}</p>
          </div>
        </div>
      </Card>

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
