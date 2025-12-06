import StatusSection from '@/components/admin/status-section';
import StatusTableItem from '@/components/admin/status-table-item';
import Badge from '@/components/common/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { currentUser } from '@clerk/nextjs/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Settings, Stethoscope } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getQueryClient } from '../query-client';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { appointmentQueryOptions } from '@/lib/query-options/appointment';
import AppointmentTable from '@/components/admin/appointment-table';
import StatusTable from '@/components/admin/status-table';

const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  if (user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL) redirect('/');

  const queryClient = getQueryClient();
  await Promise.allSettled([
    queryClient.prefetchQuery(doctorQueryOptions),
    queryClient.prefetchQuery(appointmentQueryOptions),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="container mt-4 mx-auto px-4">
        {/* Header */}
        <Card className="px-4">
          <div className="flex justify-between items-center">
            {/* left */}
            <div className="flex flex-col items-start gap-3">
              <Badge>
                <span className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm text-primary">Admin Dashboard</span>
              </Badge>
              <h1 className="text-xl md:text-3xl font-bold">Welcome back, {user.firstName}!</h1>
              <p className="text-muted-foreground text-sm md:text-md lg:text-lg">
                Manage doctors, oversee appointments, and monitor your dental practice performance.
              </p>
            </div>
            {/* right */}
            <div className="bg-primary/20 rounded-full p-4">
              <Settings className="w-10 h-10 md:w-20 md:h-20" color="var(--primary)" />
            </div>
          </div>
        </Card>
        {/* Status section */}
        <StatusSection />

        <StatusTable />
        {/* Datatable */}
        <AppointmentTable />
      </section>
    </HydrationBoundary>
  );
};

export default AdminPage;
