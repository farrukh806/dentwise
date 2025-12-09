import StatusSection from '@/components/admin/status-section';
import { currentUser } from '@clerk/nextjs/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Settings } from 'lucide-react';
import { redirect } from 'next/navigation';
import { getQueryClient } from '../../query-client';
import { doctorQueryOptions } from '@/lib/query-options/doctor';
import { appointmentQueryOptions } from '@/lib/query-options/appointment';
import AppointmentTable from '@/components/admin/appointment-table';
import StatusTable from '@/components/admin/status-table';
import WelcomeCard from '@/components/common/welcome-card';

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
      {/* Header */}
      <WelcomeCard
        headline={`Welcom back, ${user.firstName}!`}
        description={
          'Manage doctors, oversee appointments, and monitor your dental practice performance.'
        }
        badgeTitle={'Admin Dashboard'}
        icon={<Settings className="w-10 h-10 md:w-20 md:h-20" color="var(--primary)" />}
      />
      {/* Status section */}
      <StatusSection />

      <StatusTable />
      {/* Datatable */}
      <AppointmentTable />
    </HydrationBoundary>
  );
};

export default AdminPage;
