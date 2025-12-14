'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getAvailableSlots } from '@/lib/actions/appointments';
import { appointmentTypesOptions } from '@/lib/query-options/appointment';
import { format, addDays, startOfToday } from 'date-fns';
import { toast } from 'sonner';
import AppointmentTypeSelection from './appointment-type-selection';
import DateCalendar from './date-calendar';
import TimeSlotSelection from './time-slot-selection';

interface IDateSelectionStep {
  doctorId: string;
  initialData?: {
    type?: any;
    date?: Date;
    time?: string;
  };
  onBack: () => void;
  onContinue: (stepNumber: number, data: { type: any; date: Date; time: string }) => void;
}

const DateSelectionStep: React.FC<IDateSelectionStep> = ({
  doctorId,
  initialData,
  onBack,
  onContinue,
}) => {
  const [selectedType, setSelectedType] = useState<string>(
    typeof initialData?.type === 'object' ? (initialData.type as any).id : initialData?.type || ''
  );
  // Default to tomorrow
  const [selectedDate, setSelectedDate] = useState<Date>(
    initialData?.date || addDays(startOfToday(), 1)
  );
  const [selectedTime, setSelectedTime] = useState<string>(initialData?.time || '');

  // Fetch Appointment Types
  const { data: types, isLoading: isLoadingTypes } = useQuery(appointmentTypesOptions);

  // Fetch Available Slots
  const {
    data: slots,
    isLoading: isLoadingSlots,
    error: slotsError,
  } = useQuery({
    queryKey: ['availableSlots', doctorId, selectedDate],
    queryFn: async () => {
      const res = await getAvailableSlots(selectedDate, doctorId);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!doctorId && !!selectedDate,
  });

  if (slotsError) {
    toast.error('Failed to load available slots');
  }

  // Generate next 5 days
  const availableDates = Array.from({ length: 5 }).map((_, i) => {
    const date = addDays(startOfToday(), i + 1);
    return {
      date: date,
      day: format(date, 'EEE'),
      dateStr: format(date, 'MMM d'),
    };
  });

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
        <div>
          <h2 className="text-xl font-bold">Select Date & Time</h2>
          <p className="text-sm text-muted-foreground">Booking with Dr. John Smith</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Appointment Type */}
        <div className="lg:col-span-5 space-y-4">
          <AppointmentTypeSelection
            types={types}
            selectedType={selectedType}
            onSelect={setSelectedType}
            isLoading={isLoadingTypes}
          />
        </div>

        {/* Right Column: Date & Time */}
        <div className="lg:col-span-7 space-y-8">
          {/* Dates */}
          <DateCalendar
            availableDates={availableDates}
            selectedDate={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime('');
            }}
          />

          {/* Times */}
          <TimeSlotSelection
            slots={slots}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
            isLoading={isLoadingSlots}
          />
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-10 flex justify-end">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          onClick={() => {
            const typeData = types?.find((t) => t.id === selectedType);
            onContinue(3, { type: typeData, date: selectedDate, time: selectedTime });
          }}
          disabled={!selectedType || !selectedDate || !selectedTime}
        >
          Review Booking
        </Button>
      </div>
    </div>
  );
};

export default DateSelectionStep;
