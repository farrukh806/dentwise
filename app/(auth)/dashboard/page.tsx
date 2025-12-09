import FeatureCardWrapper from '@/components/common/feature-card-wrapper';
import HowToUseItem from '@/components/common/how-to-use-item';
import WelcomeCard from '@/components/common/welcome-card';
import { currentUser } from '@clerk/nextjs/server';
import { Calendar, MessageSquareIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');
  return (
    <>
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
      <div className="mt-5 flex flex-col gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          {/* How to use */}
          <FeatureCardWrapper
            icon={
              <Image
                src={'/audio.png'}
                width={14}
                height={14}
                alt="Audio icon"
                className="w-10 h-10 object-cover"
                color="var(--primary)"
              />
            }
            title="AI Voice Assistant"
            description="Get instant dental advice through voice calls"
            content={
              <>
                <ul>
                  <HowToUseItem title="24/7 availability" />
                  <HowToUseItem title="Professional dental guidance" />
                  <HowToUseItem title="Instant pain relief advice" />
                </ul>
                <Link
                  href={'/voice'}
                  className="mt-5 justify-center border rounded-sm p-1 flex items-center gap-2 transition duration-500  hover:bg-primary hover:text-white"
                >
                  <MessageSquareIcon className="w-5 h-5" color="white" />
                  <span>Start Voice Call</span>
                </Link>
              </>
            }
          />

          {/* Features */}
          <FeatureCardWrapper
            icon={
              <Image
                src={'/calendar.png'}
                width={14}
                height={14}
                alt="Calendar icon"
                className="w-10 h-10 object-cover"
                color="var(--primary)"
              />
            }
            title="Book Appointment"
            description="Schedule with verified dentists in your area"
            content={
              <>
                <ul>
                  <HowToUseItem title="Verified dental professionals" />
                  <HowToUseItem title="Flexible scheduling" />
                  <HowToUseItem title="Instant confirmations" />
                </ul>
                <Link
                  href={'/voice'}
                  className="mt-5 justify-center border rounded-sm p-1 flex items-center gap-2 transition duration-500  hover:bg-primary hover:text-white"
                >
                  <Calendar className="w-5 h-5" color="white" />
                  <span>Schedule now</span>
                </Link>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
