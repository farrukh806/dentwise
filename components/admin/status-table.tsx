'use client';
import { Card } from '../ui/card';
import { AddUpdateDoctor } from './add-update-doctor';
import { Stethoscope } from 'lucide-react';
import DoctorItem from './doctor-item';
import { useSuspenseQuery } from '@tanstack/react-query';
import { doctorQueryOptions } from '@/lib/query-options/doctor';

const StatusTable = () => {
  const { data: doctors } = useSuspenseQuery(doctorQueryOptions);
  return (
    <div className="mt-5">
      <Card className="px-5">
        <div className="flex justify-between items-center">
          <div>
            <Stethoscope className="w-5 h-5 inline" color="var(--primary)" />
            <h4 className="font-bold text-sm inline ms-2">Doctors Management</h4>
            <p className="text-sm mt-1">Manage and oversee all doctors in your practice</p>
          </div>
          <AddUpdateDoctor />
        </div>
        {doctors.map((doctor) => (
          <DoctorItem key={doctor.id} {...doctor} />
        ))}
      </Card>
    </div>
  );
};

export default StatusTable;
