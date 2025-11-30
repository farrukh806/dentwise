import Image from 'next/image';
import Badge from '../common/badge';
import { Card } from '../ui/card';

interface CardProps {
  title: string;
  description: string;
  image: string;
  badges: string[];
  stepNumber: number;
}

const CardItem = ({ title, description, image, badges, stepNumber }: CardProps) => {
  return (
    <Card className="relative px-2 py-5 grid grid-rows-subgrid gap-3 row-span-4 content-center text-center">
      <span className="absolute -top-3 left-0 w-6 h-6 text-black font-bold bg-primary rounded-full">
        {stepNumber}
      </span>
      <Image
        src={image}
        width={120}
        height={120}
        alt="Audio"
        className="w-30 h-30 object-cover row-start-1 row-end-2 mx-auto"
      />
      <h3 className="row-start-2 row-end-3 text-xl font-semibold">{title}</h3>
      <p className="row-start-3 row-end-4 text-muted-foreground">{description}</p>
      <div className="flex max-w-full justify-center gap-2 flex-wrap shrink-0">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center">
            <Badge key={index}>
              <span className="text-xs">{badge}</span>
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CardItem;
