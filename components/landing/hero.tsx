import React from 'react';
import SignInButton from '../common/sign-in-button';
import { Calendar, Mic, Star } from 'lucide-react';
import { Button } from '../ui/button';
import SignUpButton from '../common/sign-up-button';
import Testimonials from './testimonials';
import Image from 'next/image';
import ActionSection from './action-section';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-24 lg:py-22">
      {/* Grid background */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-muted/5 to-primary/5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
      </div>
      {/* Gradient ORBS */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-linear-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-linear-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" />
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left side */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <ActionSection />
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <SignInButton>
                  <Button size={'lg'} className="w-full sm:w-auto">
                    <Mic className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span>Try voice agent</span>
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size={'lg'} variant={'outline'} className="w-full sm:w-auto">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                    <span>Book Appointment</span>
                  </Button>
                </SignUpButton>
              </div>
              {/* Testimonials */}
              <div className="flex flex-col sm:flex-row items-center md:items-start sm:items-center gap-4">
                <Testimonials />
                {/* Ratings */}
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className="h-3 w-3 md:h-4 md:w-4 fill-amber-400 tex-amber-400"
                      />
                    ))}
                    <span className="text-xs md:text-sm ms-1">4.9/5</span>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Trusted by <span className="text-foreground">1,200+ patients</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:block">
              <Image
                src={'/hero.png'}
                alt="Hero"
                width={600}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
