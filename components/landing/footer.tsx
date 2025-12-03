import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <section className="container px-4 max-w-7xl mx-auto my-10">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(120px,100%),1fr))] gap-8 items-start justify-start">
        {/* first column */}
        <div className="flex flex-col gap-4 w-full text-left">
          <h3 className="font-bold text-lg mb-4 inline-flex items-center gap-2">
            <Image src={'/logo.png'} alt="Logo" width={15} height={15} className="object-cover" />
            <span>DentiWise</span>
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-powered dental assistance that actually helps.
          </p>
        </div>

        {/* other columns */}
        <div className="flex flex-col gap-4 w-full text-left">
          <h4 className="font-bold text-md">Product</h4>
          <p className="text-sm text-muted-foreground">How it works</p>
          <p className="text-sm text-muted-foreground">Pricing</p>
          <p className="text-sm text-muted-foreground">FAQ</p>
        </div>

        <div className="flex flex-col gap-4 w-full text-left">
          <h4 className="font-bold text-md">Support</h4>
          <p className="text-sm text-muted-foreground">Help center</p>
          <p className="text-sm text-muted-foreground">Contact us</p>
          <p className="text-sm text-muted-foreground">Status</p>
        </div>

        <div className="flex flex-col gap-4 w-full text-left">
          <h4 className="font-bold text-md">Legal</h4>
          <p className="text-sm text-muted-foreground">Privacy</p>
          <p className="text-sm text-muted-foreground">Terms</p>
          <p className="text-sm text-muted-foreground">Security</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
