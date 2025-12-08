'use client';

import { cn } from '@/lib/utils';

type PillTone = 'neutral' | 'success' | 'warning' | 'danger';

const toneStyles: Record<PillTone, string> = {
  neutral: 'bg-white/5 text-white',
  success: 'bg-emerald-500/15 text-emerald-200',
  warning: 'bg-amber-500/15 text-amber-200',
  danger: 'bg-red-500/15 text-red-200',
};

interface CallStatusPillProps {
  label: string;
  tone?: PillTone;
  pulse?: boolean;
}

const CallStatusPill: React.FC<CallStatusPillProps> = ({ label, tone = 'neutral', pulse }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium',
        toneStyles[tone]
      )}
    >
      <span
        className={cn('h-2 w-2 rounded-full', pulse && 'animate-pulse', {
          'bg-emerald-400': tone === 'success',
          'bg-amber-400': tone === 'warning',
          'bg-red-400': tone === 'danger',
          'bg-white/70': tone === 'neutral',
        })}
      />
      {label}
    </span>
  );
};

export default CallStatusPill;
