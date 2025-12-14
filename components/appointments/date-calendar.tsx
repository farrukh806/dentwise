import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { isSameDay } from 'date-fns';

interface DateCalendarProps {
  availableDates: {
    date: Date;
    day: string;
    dateStr: string;
  }[];
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const DateCalendar: React.FC<DateCalendarProps> = ({ availableDates, selectedDate, onSelect }) => {
  return (
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
            onClick={() => onSelect(item.date)}
          >
            <span className="text-xs font-normal opacity-80">
              {item.day}, {item.dateStr}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateCalendar;
