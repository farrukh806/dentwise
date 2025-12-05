'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import StatusCard from './status-card';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { UserRoundCheck, Users } from 'lucide-react';
import { toast } from 'sonner';

const StatusSection = () => {
  const { data, error } = useSuspenseQuery(doctorQueryOptions);
  if (error) toast.error(error.message);
  //   [
  //   {
  //     count: 2,
  //     icon: ,
  //     description: 'Total Doctors',
  //   },
  //   {
  //     count: 2,
  //     icon: ,
  //     description: 'Active Doctors',
  //   },
  //   {
  //     count: 7,
  //     icon: <Calendar className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />,
  //     description: 'Total Appointments',
  //   },
  //   {
  //     count: 2,
  //     icon: <Clock className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />,
  //     description: 'Completed Appointments',
  //   },
  // ];
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10 mt-5">
      <StatusCard
        count={data.length}
        description="Total Doctors"
        icon={<Users className="w-15 h-15 rounded-md bg-primary/5 p-4" color="white" />}
      />
      <StatusCard
        count={data.filter((item) => item.isActive).length}
        description="Active Doctors"
        icon={<UserRoundCheck className="w-15 h-15 bg-white/5 rounded-md p-4" color="white" />}
      />
    </div>
  );
};

export default StatusSection;
