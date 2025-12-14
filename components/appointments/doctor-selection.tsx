'use client';
import React, { useState } from 'react';
import DoctorCard from './doctor-card';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { DoctorSkeleton } from './doctor-skeleton';
import { toast } from 'sonner';

interface IDoctorSelectionStep {
  onContinue: (stepNumber: number, doctorId?: string) => void;
}

const DoctorSelectionStep: React.FC<IDoctorSelectionStep> = (props) => {
  const { data, isLoading, error } = useQuery(doctorQueryOptions);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  if (isLoading) return <DoctorSkeleton />;
  if (error) toast.error(error.message);
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-2 mt-5">
        {data?.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            {...doctor}
            onClick={setSelectedDoctor}
            isSelected={selectedDoctor === doctor.id}
          />
        ))}
      </div>
      {selectedDoctor && (
        <div className="mt-10 text-end">
          <Button onClick={() => props.onContinue(2, selectedDoctor)}>
            Continue to Time Selection
          </Button>
        </div>
      )}
    </>
  );
};

export default DoctorSelectionStep;
