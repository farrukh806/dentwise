'use client';
import { useSuspenseQueries } from '@tanstack/react-query';
import StatusCard from './status-card';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { Calendar, Clock, UserRoundCheck, Users } from 'lucide-react';
import { appointmentQueryOptions } from '@/lib/query-options/appointment';

const StatusSection = () => {
  const { doctors, appointmens } = useSuspenseQueries({
    queries: [doctorQueryOptions, appointmentQueryOptions],
    combine(result) {
      return { doctors: result[0].data, appointmens: result[1].data };
    },
  });
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10 mt-5">
      <StatusCard
        count={doctors.length}
        description="Total Doctors"
        icon={<Users className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />}
      />
      <StatusCard
        count={doctors.filter((item) => item.isActive).length}
        description="Active Doctors"
        icon={<UserRoundCheck className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />}
      />
      <StatusCard
        count={appointmens.length}
        description="Total Appointments"
        icon={<Calendar className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />}
      />
      <StatusCard
        count={appointmens.filter((appointment) => appointment.status === 'COMPLETED').length}
        description="Completed Appointments"
        icon={<Clock className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />}
      />
    </div>
  );
};

export default StatusSection;
