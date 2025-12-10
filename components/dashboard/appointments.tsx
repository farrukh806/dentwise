import React from 'react';
import AppointmentItem from './appointment-item';
import { Calendar, Clock, ContactRound } from 'lucide-react';

const Appointments = () => {
  return (
    <div className="flex flex-col gap-3 mt-5">
      <AppointmentItem
        icon={<ContactRound className="w-5 h-5" color="var(--primary)" />}
        title="Dr. John Smith"
        description="Teeth cleaning"
      />
      <AppointmentItem
        icon={<Calendar className="w-5 h-5" color="var(--primary)" />}
        title="Dr. John Smith"
        description="Teeth cleaning"
      />
      <AppointmentItem
        icon={<Clock className="w-5 h-5" color="var(--primary)" />}
        title="Dr. John Smith"
        description="Teeth cleaning"
      />
      <span className="text-center text-muted-foreground text-xs">
        +1 more upcoming appointment
      </span>
    </div>
  );
};

export default Appointments;
