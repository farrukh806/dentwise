'use client';
import Image from 'next/image';
import Link from 'next/link';
import SignInButton from '../common/sign-in-button';
import SignUpButton from '../common/sign-up-button';
import { useUser } from '@clerk/nextjs';
import { Navbar } from '../common/navbar';

const Header = () => {
  const user = useUser();
  if (user.user) return <Navbar />;
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-1 md:px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="w-full md:max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src={'/logo.png'} alt="Logo" width={32} height={32} className="w-11" />
          <span className="font-semibold text-lg">DentWise</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-muted-foreground hover:text-foreground">
            How it Works
          </Link>
          <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="#about" className="text-muted-foreground hover:text-foreground">
            About
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <SignInButton />
          <SignUpButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
