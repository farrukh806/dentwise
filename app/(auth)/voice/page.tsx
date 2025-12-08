import { Card } from '@/components/ui/card';
import FeatureItem from '@/components/voice/feature-item';
import HowToUseItem from '@/components/voice/how-to-use-item';
import ProPlanRequired from '@/components/voice/pro-plan-require';
import VapiWidget from '@/components/voice/vapi-widget';
import { PLANS } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';
import { Calendar, Mic, Shield } from 'lucide-react';

const VoicePage = async () => {
  const { has } = await auth();
  const hasPaidPlan = has({ plan: PLANS.AI_BASIC }) || has({ plan: PLANS.AI_PRO });
  if (!hasPaidPlan) return <ProPlanRequired />;
  return (
    <div className="mt-5 flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {/* How to use */}
        <Card className="flex-1 min-w-0 flex flex-col gap-2 px-4 transition duration-500 hover:outline hover:outline-primary hover:bg-linear-to-br hover:from-primary/10 hover:via-primary/5 hover:to-background">
          <div className="inline-flex gap-3 items-center">
            <div className="bg-primary/20 rounded-lg p-2">
              <Mic className="w-5 h-5" color="var(--primary)" />
            </div>
            <p className="text-sm">How to Use</p>
          </div>
          <p className="text-muted-foreground text-xs">
            Simple steps to get started with voice assistance
          </p>
          <ul>
            <HowToUseItem title="Click the microphone button to start talking" />
            <HowToUseItem title="Ask questions about dental health and treatment" />
            <HowToUseItem title="Get instant voice responses from AI" />
            <HowToUseItem title="View conversation transcript in real-time" />
          </ul>
        </Card>
        {/* Features */}
        <Card className="flex-1 min-w-0 flex flex-col gap-2 px-4 transition duration-500 hover:outline hover:outline-primary hover:bg-linear-to-br hover:from-primary/10 hover:via-primary/5 hover:to-background">
          <div className="inline-flex gap-3 items-center">
            <div className="bg-primary/20 rounded-lg p-2">
              <Shield className="w-5 h-5" color="var(--primary)" />
            </div>
            <p className="text-sm">Features</p>
          </div>
          <p className="text-muted-foreground text-xs">Advance capabilities for dental care</p>
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
        </Card>
      </div>
      <VapiWidget />
    </div>
  );
};

export default VoicePage;
