import React, { ReactNode } from 'react';
import { Card } from '../ui/card';
import Badge from './badge';

interface IWelcomeCardProps {
  headline: string;
  badgeTitle: string;
  description: string;
  icon: ReactNode;
}

const WelcomeCard: React.FC<IWelcomeCardProps> = (props) => {
  return (
    <Card className="px-4 bg-linear-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
      <div className="flex justify-between items-center">
        {/* left */}
        <div className="flex flex-col items-start gap-3">
          <Badge>
            <span className="animate-pulse w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm text-primary">{props.badgeTitle}</span>
          </Badge>
          <h1 className="text-xl md:text-3xl font-bold">{props.headline}</h1>
          <p className="text-muted-foreground text-sm md:text-md lg:text-lg">{props.description}</p>
        </div>
        {/* right */}
        <div className="bg-primary/20 rounded-full p-4">{props.icon}</div>
      </div>
    </Card>
  );
};

export default WelcomeCard;
