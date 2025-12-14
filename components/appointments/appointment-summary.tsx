import React from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { format } from 'date-fns';

interface AppointmentSummaryProps {
  doctor: {
    name: string;
    speciality: string;
    imageUrl: string;
  };
  type: {
    title: string;
    duration: number;
    price: number;
  };
  date: Date;
  time: string;
}

const AppointmentSummary: React.FC<AppointmentSummaryProps> = ({ doctor, type, date, time }) => {
  return (
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
  );
};

export default AppointmentSummary;
