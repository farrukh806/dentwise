'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Card } from '../ui/card';
import { patientAppointmentStatsOptions } from '@/lib/query-options/appointment';
import { toast } from 'sonner';

const DentalJourney = () => {
  const { data, error } = useSuspenseQuery(patientAppointmentStatsOptions);
  if (error) {
    toast.error(error.message);
    return null;
  }
  const completed = data?.filter((appointment) => appointment.status === 'COMPLETED').length;

  return (
    <div className="flex flex-row flex-wrap justify-between gap-2">
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">{completed}</h3>
        <span className="text-muted-foreground text-sm">Completed Visits</span>
      </Card>
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">{data?.length}</h3>
        <span className="text-muted-foreground text-sm">Total appointments</span>
      </Card>
      <Card className="flex flex-col items-center gap-2 grow">
        <h3 className="font-bold text-md text-primary">December 2025</h3>
        <span className="text-muted-foreground text-sm">Member Since</span>
      </Card>
    </div>
  );
};

export default DentalJourney;
