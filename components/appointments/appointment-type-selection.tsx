import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AppointmentType {
  id: string;
  title: string;
  duration: number;
  price: number;
}

interface AppointmentTypeSelectionProps {
  types?: AppointmentType[];
  selectedType: string;
  onSelect: (id: string) => void;
  isLoading: boolean;
}

const AppointmentTypeSelection: React.FC<AppointmentTypeSelectionProps> = ({
  types,
  selectedType,
  onSelect,
  isLoading,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Appointment Type</h3>
      {isLoading ? (
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
              onClick={() => onSelect(type.id)}
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
  );
};

export default AppointmentTypeSelection;
