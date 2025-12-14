'use client';
import SignInButton from '../common/sign-in-button';
import { Calendar, Mic } from 'lucide-react';
import { Button } from '../ui/button';
import SignUpButton from '../common/sign-up-button';
import Image from 'next/image';
import ActionSection from './action-section';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Cta = () => {
  const { isSignedIn } = useUser();
  return (
    <section className="relative flex items-center overflow-hidden py-20 md:py-24 lg:py-22">
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left side */}
            <div className="space-y-6 md:space-y-8 lg:space-y-10">
              <ActionSection
                badge={
                  <>
                    <span className="w-2 h-2 rounded-full animate-pulse bg-primary"></span>
                    <span className="text-xs md:text-sm">Ready When You Are</span>
                  </>
                }
                headingHighlight={
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    Your dental health <br />
                    <span className="text-primary">journey starts here</span>
                  </h1>
                }
                description="Join 1,200+ patients who trust our AI for instant guidance and personalized care"
              />
              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {!isSignedIn ? (
                  <SignInButton>
                    <Button size={'lg'} className="w-full sm:w-auto">
                      <Mic className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span>Start free chat</span>
                    </Button>
                  </SignInButton>
                ) : (
                  <Link href={'/voice'}>
                    <Button size={'lg'} className="w-full sm:w-auto">
                      <Mic className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span>Start free chat</span>
                    </Button>
                  </Link>
                )}
                {!isSignedIn ? (
                  <SignUpButton>
                    <Button size={'lg'} variant={'outline'} className="w-full sm:w-auto">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span>Book appointment</span>
                    </Button>
                  </SignUpButton>
                ) : (
                  <Link href={'/appointments'}>
                    <Button size={'lg'} variant={'outline'} className="w-full sm:w-auto">
                      <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                      <span>Book appointment</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:block ms-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-green-500 text-white rounded-full border border-green/20 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full animate-pulse bg-white"></span>
                <span className="text-xs md:text-sm">Ready When You Are</span>
              </div>
              <Image
                src={'/cta.png'}
                alt="Hero"
                width={450}
                height={450}
                className="h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
