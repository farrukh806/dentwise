import React from 'react';
import SignInButton from '../common/sign-in-button';
import { Calendar, Mic } from 'lucide-react';
import { Button } from '../ui/button';
import SignUpButton from '../common/sign-up-button';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Grid background */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>
      {/* Gradient ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />
      <div className="relative z-10 w-full px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side */}
            <div className="space-y-10">
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full animate-pulse bg-primary"></span>
                  <span>AI-Powered Dental Assistant</span>
                </div>
                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-bold mb-3">
                  Your dental <span className="text-primary">questions</span> answered instantly
                </h1>
                <p>
                  Chat with our AI dental assistant for instant advice, book smart appointments, and
                  get personalized care recommendations. Available 24/7, no waiting required.
                </p>
              </div>
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <SignInButton>
                  <Button size={'lg'}>
                    <Mic className="w-5 h-5 mr-2" />
                    <span>Try voice agent</span>
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size={'lg'} variant={'outline'}>
                    <Calendar className="w-5 h-5 mr-2" />
                    <span>Book Appointment</span>
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
