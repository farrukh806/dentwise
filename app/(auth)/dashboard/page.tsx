import { getQueryClient } from '@/app/query-client';
import Badge from '@/components/common/badge';
import FeatureCardWrapper from '@/components/common/feature-card-wrapper';
import WelcomeCard from '@/components/common/welcome-card';
import Action from '@/components/dashboard/action';
import Appointments from '@/components/dashboard/appointments';
import DentalJourney from '@/components/dashboard/dental-journey';
import {
  patientAppointmentStatsOptions,
  patientUpcomingAppointmentsOptions,
} from '@/lib/query-options/appointment';
import { currentUser } from '@clerk/nextjs/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Brain, Calendar, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  const queryClient = getQueryClient();
  await Promise.allSettled([
    queryClient.prefetchQuery(patientAppointmentStatsOptions),
    queryClient.prefetchQuery(patientUpcomingAppointmentsOptions),
  ]);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WelcomeCard
        headline={`Welcome, ${user.firstName}`}
        description={
          'Your personal AI dental assistant is ready to help you maintain perfect oral health.'
        }
        badgeTitle={'Online & Ready'}
        icon={
          <Image
            src={'/logo.png'}
            alt="logo"
            width={30}
            height={30}
            className="w-10 h-10 md:w-20 md:h-20"
          />
        }
      />
      <Action />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10 my-5">
        <FeatureCardWrapper
          icon={<Brain className="w-5 h-5" color="var(--primary)" />}
          title="Your Dental Health"
          description="Keep track of your dental care journey"
          content={
            <div className="flex flex-col gap-3">
              <DentalJourney />
              <FeatureCardWrapper
                icon={<MessageSquare className="w-5 h-5" color="var(--primary)" />}
                title="Ready to get started?"
                description="Book your first appointment or try our AI voice assistant for instant dental advice."
                content={
                  <div className="flex flex-row items-center gap-4 justify-center mt-2">
                    <Link href="/voice" className="bg-primary p-2 text-black rounded-sm">
                      Try AI Assistant
                    </Link>
                    <Link href="#" className="bg-white/5 p-2 rounded-sm">
                      Book Appointment
                    </Link>
                  </div>
                }
              />
            </div>
          }
        />
        <FeatureCardWrapper
          icon={<Calendar className="w-5 h-5" color="var(--primary)" />}
          title="Next Appointment"
          description=""
          content={
            <div className="flex flex-col gap-3">
              <div className="flex flex-row flex-wrap justify-between">
                <Badge>
                  <span className="animate-pulse w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm text-primary">Upcoming</span>
                </Badge>
                <span className="p-2 rounded-sm capitalize text-muted-foreground text-sm border">
                  Confirmed
                </span>
              </div>
              <Appointments />
            </div>
          }
        />
      </div>
    </HydrationBoundary>
  );
};

export default DashboardPage;
