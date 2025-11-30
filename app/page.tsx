import Cta from '@/components/landing/cta';
import Footer from '@/components/landing/footer';
import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import HowItWorks from '@/components/landing/how-it-works';
import Pricing from '@/components/landing/pricing';
import WhatToAsk from '@/components/landing/what-to-ask';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <Pricing />
      <Cta />
      <Footer />
    </div>
  );
}
