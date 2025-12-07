import WelcomeCard from '@/components/common/welcome-card';
import { Mic } from 'lucide-react';
import React, { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WelcomeCard
        badgeTitle="Voice Assistant Ready"
        headline="AI Voice Assistant"
        description="Talk to your AI dental assistant using natural voice commands. Get instant advice and professional guidance."
        icon={<Mic className="w-10 h-10 md:w-20 md:h-20" color="var(--primary)" />}
      />
      {children}
    </>
  );
};

export default Layout;
