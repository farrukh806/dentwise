'use client';

import CallStatusPill from './call-status-pill';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ParticipantCardProps {
  name: string;
  role: string;
  statusLabel: string;
  statusTone?: Parameters<typeof CallStatusPill>[0]['tone'];
  icon: ReactNode;
  accent?: 'primary' | 'blue';
  glow?: boolean;
  isSpeaking?: boolean;
}

const accentRing: Record<NonNullable<ParticipantCardProps['accent']>, string> = {
  primary: 'ring-orange-400/60',
  blue: 'ring-cyan-300/60',
};

const accentIcon: Record<NonNullable<ParticipantCardProps['accent']>, string> = {
  primary: 'text-orange-400',
  blue: 'text-cyan-300',
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  name,
  role,
  statusLabel,
  statusTone = 'neutral',
  icon,
  accent = 'primary',
  glow,
  isSpeaking,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 shadow-lg">
      <div className={cn('absolute inset-0 bg-linear-to-br opacity-60 pointer-events-none')} />
      {glow && (
        <div className="absolute inset-0 blur-3xl opacity-30 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      )}
      <div className="relative flex flex-col items-center gap-4 text-center">
        <div
          className={cn(
            'relative flex h-24 w-24 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/10 shadow-inner',
            accentIcon[accent]
          )}
        >
          {isSpeaking && (
            <span
              className={cn(
                'absolute inset-0 rounded-full animate-ping',
                accentRing[accent],
                'bg-current/20'
              )}
              aria-hidden
            />
          )}
          {isSpeaking && (
            <span
              className={cn(
                'absolute inset-0 rounded-full',
                accentRing[accent],
                'ring-4 animate-pulse'
              )}
              aria-hidden
            />
          )}
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-semibold tracking-wide">{name}</h3>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
        <CallStatusPill label={statusLabel} tone={statusTone} pulse={statusTone === 'warning'} />
      </div>
    </div>
  );
};

export default ParticipantCard;
