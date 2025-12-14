import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Clock, Loader2 } from 'lucide-react';

interface TimeSlot {
  id: string;
  time: string;
  booked: boolean;
}

interface TimeSlotSelectionProps {
  slots?: TimeSlot[];
  selectedTime: string;
  onSelect: (time: string) => void;
  isLoading: boolean;
}

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({
  slots,
  selectedTime,
  onSelect,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Available Times</h3>
      {isLoading ? (
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
              onClick={() => !slot.booked && onSelect(slot.id)}
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
  );
};

export default TimeSlotSelection;
