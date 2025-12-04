'use client';

import { useUser, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, Crown, Home, Menu, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

const NavContent = ({ isVertical = false }: { isVertical?: boolean }) => {
  const pathname = usePathname();

  return (
    <nav className={cn('flex px-4 gap-6', isVertical ? 'flex-col' : 'items-center')}>
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-colors',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
              isVertical && 'py-2'
            )}
          >
            <Icon className="size-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const navigationItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/appointments', label: 'Appointments', icon: Calendar },
  { href: '/voice', label: 'Voice', icon: Mic },
  { href: '/pro', label: 'Pro', icon: Crown },
];

export const Navbar = () => {
  const { user, isLoaded } = useUser();
  const isMobile = useIsMobile();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/5">
      <div className="container w-full mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="DentWise Logo" width={32} height={32} className="size-8" />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && <NavContent />}
        </div>

        {/* User Info */}
        {user && (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="size-10 border-2 border-primary/20 cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.fullName || 'User'}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.primaryEmailAddress?.emailAddress}
                    </span>
                  </div>
                </DropdownMenuItem>
                <SignOutButton redirectUrl="/">
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </SignOutButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-6">
                <NavContent isVertical />
                {user && (
                  <div className="flex flex-col gap-4 border-t pt-6 px-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="size-10 border-2 border-primary/20">
                        <AvatarImage src={user.imageUrl} alt={user.fullName || 'User'} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">
                          {user.fullName || 'User'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {user.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </div>
                    <SignOutButton redirectUrl="/">
                      <Button variant="outline" className="w-full">
                        Logout
                      </Button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};
