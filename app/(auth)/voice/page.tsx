import FeatureItem from '@/components/common/feature-item';
import HowToUseItem from '@/components/common/how-to-use-item';
import ProPlanRequired from '@/components/voice/pro-plan-require';
import VapiWidget from '@/components/voice/vapi-widget';
import { PLANS } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';
import { Calendar, Mic, Shield } from 'lucide-react';
import FeatureCardWrapper from '@/components/common/feature-card-wrapper';

const VoicePage = async () => {
  const { has } = await auth();
  const hasPaidPlan = has({ plan: PLANS.AI_BASIC }) || has({ plan: PLANS.AI_PRO });
  if (!hasPaidPlan) return <ProPlanRequired />;
  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* How to use */}
        <FeatureCardWrapper
          icon={<Mic className="w-5 h-5" color="var(--primary)" />}
          title="How to Use"
          description="Simple steps to get started with voice assistance"
          content={
            <ul>
              <HowToUseItem title="Click the microphone button to start talking" />
              <HowToUseItem title="Ask questions about dental health and treatment" />
              <HowToUseItem title="Get instant voice responses from AI" />
              <HowToUseItem title="View conversation transcript in real-time" />
            </ul>
          }
        />

        {/* Features */}
        <FeatureCardWrapper
          icon={<Shield className="w-5 h-5" color="var(--primary)" />}
          title="Features"
          description="Advance capabilities for dental care"
          content={
            <div className="flex flex-col gap-2">
              <FeatureItem
                icon={<Mic className="w-5 h-5" color="var(--primary)" />}
                title="Real-time Voice Recognition"
              />
              <FeatureItem
                icon={<Shield className="w-5 h-5" color="var(--primary)" />}
                title="AI-Powered Responses"
              />
              <FeatureItem
                icon={<Calendar className="w-5 h-5" color="var(--primary)" />}
                title="Conversation History"
              />
            </div>
          }
        />
      </div>
      <VapiWidget />
    </div>
  );
};

export default VoicePage;
