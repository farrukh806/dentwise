import Badge from '../common/badge';
import { ZapIcon } from 'lucide-react';
import Card from './card';

const HowItWorks = () => {
  return (
    <section className="container mx-auto my-10 px-4 sm:px-6 lg:px-10">
      <div className="text-center">
        <Badge>
          <ZapIcon color="var(--primary)" className="mr-2 h-4 w-4" />
          <span className="text-primary text-sm">Simple Process</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-3">
          Four steps to <br />
          <span className="text-primary">better dental health</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          Our streamlines process makes dental care accessible, <br />
          convenient, and stress-free for everyone
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8 mt-10 justify-items-center place-items-center">
        <Card
          title="Ask Questions"
          description="Chat with our AI assistant about any dental concerns. Get instant answers about symptoms, treatments and oral health tips."
          image="/audio.png"
          badges={['24/7 Available', 'Instant response']}
          stepNumber={1}
        />

        <Card
          title="Get Diagnosis"
          description="Receive AI-powered preliminary diagnosis based on your symptoms. Understand your condition before visiting a dentist."
          image="/brain.png"
          badges={['AI-Powered', 'Accurate']}
          stepNumber={2}
        />

        <Card
          title="Find Dentist"
          description="Connect with qualified dentists in your area. Book appointments and get professional care when you need it."
          image="/calendar.png"
          badges={['Verified Dentists', 'Easy Booking']}
          stepNumber={3}
        />
      </div>
    </section>
  );
};

export default HowItWorks;
