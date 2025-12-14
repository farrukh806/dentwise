'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Clock, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getAvailableSlots } from '@/lib/actions/appointments';
import { appointmentTypesOptions } from '@/lib/query-options/appointment';
import { format, addDays, startOfToday, isSameDay } from 'date-fns';
import { toast } from 'sonner';

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
          <h3 className="font-medium text-lg">Appointment Type</h3>
          {isLoadingTypes ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {types?.map((type) => (
                <Card
                  key={type.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all border-2',
                    selectedType === type.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{type.title}</h4>
                      <p className="text-sm text-muted-foreground">{type.duration} min</p>
                    </div>
                    <span
                      className={cn(
                        'font-bold',
                        selectedType === type.id ? 'text-primary' : 'text-primary'
                      )}
                    >
                      ${type.price}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Date & Time */}
        <div className="lg:col-span-7 space-y-8">
          {/* Dates */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Available Dates</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableDates.map((item) => (
                <Button
                  key={item.date.toISOString()}
                  variant={isSameDay(selectedDate, item.date) ? 'default' : 'outline'}
                  className={cn(
                    'h-auto py-3 flex flex-col gap-1',
                    isSameDay(selectedDate, item.date)
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
                      : 'border-border'
                  )}
                  onClick={() => {
                    setSelectedDate(item.date);
                    setSelectedTime(''); // Reset time when date changes
                  }}
                >
                  <span className="text-xs font-normal opacity-80">
                    {item.day}, {item.dateStr}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Times */}
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Available Times</h3>
            {isLoadingSlots ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots?.map((slot) => (
                  <Button
                    key={slot.id}
                    disabled={slot.booked}
                    variant={selectedTime === slot.id ? 'default' : 'outline'}
                    className={cn(
                      'w-full',
                      selectedTime === slot.id
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground border-primary'
                        : 'border-border',
                      slot.booked && 'opacity-50 cursor-not-allowed'
                    )}
                    onClick={() => !slot.booked && setSelectedTime(slot.id)}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {slot.time}
                    {slot.booked && <span className="ml-1 text-xs">(Booked)</span>}
                  </Button>
                ))}
                {!slots?.length && (
                  <p className="text-muted-foreground text-sm">No slots available for this date.</p>
                )}
              </div>
            )}
          </div>
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
