import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import Badge from '../common/badge';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  duration: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = (props) => {
  return (
    <Card className="relative bg-secondary-foreground z-2 flex-1 hover:scale-110 hover:z-10 transition-all duration-500">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {props.isPopular && (
          <span className="bg-primary rounded-4xl text-black p-2">Most Popular</span>
        )}
      </div>
      <CardContent className="flex flex-col gap-3 text-start">
        <h5 className="font-bold text-white">{props.title}</h5>
        <h3 className="font-bold text-white text-2xl">
          {props.price}
          <span className="text-muted-foreground text-sm font-normal">/{props.duration}</span>
        </h3>
        <p>{props.description}</p>
        <Button
          size={'sm'}
          variant={'outline'}
          className="rounded-full w-full mt-4 font-bold hover:bg-primary! hover:text-black hover:border-primary"
        >
          {props.ctaText}
        </Button>

        {props.features.map((feature, index) => (
          <p className="flex items-center text-nowrap" key={index}>
            <CheckCircle size={4} className="w-4 h-4 mr-2 text-primary" />
            {feature}
          </p>
        ))}
      </CardContent>
    </Card>
  );
};

export default PricingCard;
