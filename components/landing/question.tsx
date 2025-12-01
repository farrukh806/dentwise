import { Card } from '../ui/card';
import { MessageSquare } from 'lucide-react';
import Badge from '../common/badge';

type QuestionProps = {
  q: string;
  answer: string;
  badges: string[];
};

const Question: React.FC<QuestionProps> = (props) => {
  return (
    <Card className="flex flex-row p-2 items-start max-w-xl">
      <span className="bg-primary/10 rounded-md p-2">
        <MessageSquare className="text-primary" />
      </span>
      <div className="flex flex-col gap-3">
        <h4 className="text-primary font-bold bg-primary/10 p-2 rounded">{props.q}</h4>
        <div className="bg-white/5 p-3 rounded">
          <p className="text-sm text-muted-foreground mb-3">{props.answer}</p>
        </div>
        {/* Badges */}
        <div className="flex items-center">
          {props.badges.map((badge, index) => (
            <span key={index} className="text-xs mr-3 text-primary">
              <Badge>{badge}</Badge>
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default Question;
