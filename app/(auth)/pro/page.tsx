import WelcomeCard from '@/components/common/welcome-card';
import { shadcn } from '@clerk/themes';
import { PricingTable } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Crown } from 'lucide-react';
import { redirect } from 'next/navigation';
import Wrapper from '@/components/common/container-wrapper';

const ProPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');

  return (
    <>
      {/* Header */}
      <WelcomeCard
        headline={'Unlock Premium AI Dental Care'}
        description={
          'Manage doctors, oversee appointments, and monitor your dental practice performance.'
        }
        badgeTitle={'Upgrade to Pro'}
        icon={<Crown className="w-10 h-10 md:w-20 md:h-20" color="var(--primary)" />}
      />
      {/* Pricing */}
      <div className="mt-10">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mt-3">
          Choose your plan
        </h2>
        <p className="mt-3 text-muted-foreground text-md text-center my-5">
          Book appointments for free and upgrade for unlimited AI consultations. <br /> Perfect for
          ongoing dental care.
        </p>
        <PricingTable appearance={{ theme: shadcn }} />
      </div>
    </>
  );
};

export default ProPage;
