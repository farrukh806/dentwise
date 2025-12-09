import React, { ReactNode } from 'react';
import { Card } from '../ui/card';

interface IFeatureCardWrapper {
  icon: ReactNode;
  title: string;
  description: string;
  content: ReactNode;
}

const FeatureCardWrapper: React.FC<IFeatureCardWrapper> = (props) => {
  return (
    <Card className="flex-1 min-w-0 flex flex-col gap-2 px-4 transition duration-500 hover:outline hover:outline-primary hover:bg-linear-to-br hover:from-primary/10 hover:via-primary/5 hover:to-background">
      <div className="inline-flex gap-3 items-center">
        <div className="bg-primary/20 rounded-lg p-2">{props.icon}</div>
        <p className="text-sm">{props.title}</p>
      </div>
      <p className="text-muted-foreground text-xs">{props.description}</p>
      {props.content}
    </Card>
  );
};

export default FeatureCardWrapper;
