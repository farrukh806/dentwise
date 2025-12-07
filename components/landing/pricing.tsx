import { PRICING } from '@/lib/constants';
import Badge from '../common/badge';
import PricingCard from './pricing-card';

const Pricing = () => {
  return (
    <section className="relative min-h-screen container mx-auto my-10 px-4 sm:px-6 lg:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5 z-1">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>
      <div className="text-center relative z-10 mt-5">
        <Badge>
          <span className="w-2 h-2 rounded-full animate-pulse bg-primary"></span>
          <span className="text-xs md:text-sm">Simple Pricing</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-3">
          Choose your <br />
          <span className="text-primary">AI dental plan</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          Book appointments for free and upgrade for unlimited AI
          <br />
          consultations. Perfect for ongoing dental care.
        </p>

        <div className="flex justify-center flex-wrap gap-3 mt-10">
          {PRICING.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
