'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import AppointmentItem from './appointment-item';
import { ContactRound } from 'lucide-react';
import { patientUpcomingAppointmentsOptions } from '@/lib/query-options/appointment';
import { toast } from 'sonner';

const Appointments = () => {
  const { data, error } = useSuspenseQuery(patientUpcomingAppointmentsOptions);
  if (error) {
    toast.error(error.message);
    return null;
  }
  if (data?.length === 0) return <p className="text-center mt-10">No upcoming appointments</p>;
  return (
    <div className="flex flex-col gap-3 mt-5">
      {data?.slice(0, 3)?.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          icon={<ContactRound className="w-5 h-5" color="var(--primary)" />}
          title={appointment.doctor.name}
          description={appointment.reason}
        />
      ))}
      {data && data.length > 3 && (
        <span className="text-center text-muted-foreground text-xs">
          +{data.length - 3} more upcoming appointment
        </span>
      )}
    </div>
  );
};

export default Appointments;
