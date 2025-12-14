import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '../ui/card';

export function DoctorSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-4 mt-5">
      {Array.from({ length: 6 })
        .fill(1)
        .map((_, index) => (
          <Card key={index.toString()} className="px-2 min-h-[220px]">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}
