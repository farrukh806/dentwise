import React, { ReactNode } from 'react';
import { Card } from '../ui/card';

interface IStatusCard {
  icon: ReactNode;
  count: number;
  description: string;
}
const StatusCard: React.FC<IStatusCard> = (props) => {
  return (
    <Card className="px-2 flex flex-row items-center">
      {props.icon}
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold text-white">{props.count}</h2>
        <p>{props.description}</p>
      </div>
    </Card>
  );
};

export default StatusCard;
