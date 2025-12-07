import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Wrapper = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <section className={cn('container mt-4 mx-auto px-4', className)}>{children}</section>;
};

export default Wrapper;
