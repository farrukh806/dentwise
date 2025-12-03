import { ReactNode } from 'react';
import Badge from '../common/badge';

interface ActionSectionProps {
  badge: ReactNode;
  headingHighlight: ReactNode;
  description: string;
}

const ActionSection: React.FC<ActionSectionProps> = (props) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Badge */}
      <Badge>{props.badge}</Badge>
      {/* Heading */}
      {props.headingHighlight}
      <p className="text-sm sm:text-base md:text-lg text-muted-foreground">{props.description}</p>
    </div>
  );
};

export default ActionSection;
