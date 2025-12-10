import Image from 'next/image';
import FeatureCardWrapper from '../common/feature-card-wrapper';
import { Calendar, MessageSquareIcon } from 'lucide-react';
import Link from 'next/link';
import HowToUseItem from '../common/how-to-use-item';

const Action = () => {
  return (
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
  );
};

export default Action;
