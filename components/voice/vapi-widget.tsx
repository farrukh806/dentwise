'use client';

import { Button } from '@/components/ui/button';
import { createVapiClient } from '@/lib/vapi';
import { cn } from '@/lib/utils';
import { PhoneCall, PhoneOff, User } from 'lucide-react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ParticipantCard from './participant-card';

type CallState = 'idle' | 'connecting' | 'in-call' | 'ended' | 'error';

const callLabels: Record<CallState, string> = {
  idle: 'Waiting…',
  connecting: 'Connecting…',
  'in-call': 'Live',
  ended: 'Ready',
  error: 'Error',
};

const VapiWidget: React.FC = () => {
  const [callState, setCallState] = useState<CallState>('idle');
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [userSpeaking, setUserSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const vapi = useRef<ReturnType<typeof createVapiClient>>(null);
  const userSpeechTimeout = useRef<NodeJS.Timeout | null>(null);
  const [transcripts, setTranscripts] = useState<Array<{ role: string; text: string }>>([]);

  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const { user } = useUser();

  useEffect(() => {
    const client = createVapiClient();
    vapi.current = client;

    if (!client) return;

    const handleStart = () => {
      setCallState('in-call');
      setError(null);
      setTranscripts([]);
    };
    const handleEnd = () => {
      setCallState('ended');
      setAssistantSpeaking(false);
      setUserSpeaking(false);
      setTranscripts([]);
    };
    const handleSpeechStart = () => setAssistantSpeaking(true);
    const handleSpeechEnd = () => setAssistantSpeaking(false);
    const handleMessage = (message: any) => {
      if (message?.type === 'transcript' && message?.role === 'user') {
        setUserSpeaking(true);
        if (userSpeechTimeout.current) clearTimeout(userSpeechTimeout.current);
        userSpeechTimeout.current = setTimeout(() => setUserSpeaking(false), 1500);
        setTranscripts((prev) => [...prev, { role: 'You', text: message.transcript }]);
      }
      if (message?.type === 'transcript' && message?.role === 'assistant') {
        setTranscripts((prev) => [...prev, { role: 'DentWise AI', text: message.transcript }]);
      }
    };
    const handleError = (e: unknown) => {
      setError(e instanceof Error ? e.message : 'Call failed. Please try again.');
      setCallState('error');
    };

    client.on('call-start', handleStart);
    client.on('call-end', handleEnd);
    client.on('speech-start', handleSpeechStart);
    client.on('speech-end', handleSpeechEnd);
    client.on('error', handleError);
    client.on('message', handleMessage);

    return () => {
      client.stop();
      client.off('call-start', handleStart);
      client.off('call-end', handleEnd);
      client.off('speech-start', handleSpeechStart);
      client.off('speech-end', handleSpeechEnd);
      client.off('error', handleError);
      client.off('message', handleMessage);
      if (userSpeechTimeout.current) clearTimeout(userSpeechTimeout.current);
    };
  }, []);

  const isBusy = callState === 'connecting' || callState === 'in-call';

  const handleToggleCall = useCallback(() => {
    if (!vapi.current) {
      setError('Vapi client is unavailable in this environment.');
      return;
    }
    if (!assistantId) {
      setError('Missing NEXT_PUBLIC_VAPI_ASSISTANT_ID.');
      return;
    }

    if (callState === 'in-call' || callState === 'connecting') {
      vapi.current.stop();
      setCallState('ended');
      return;
    }

    setError(null);
    setCallState('connecting');
    vapi.current.start(assistantId);
  }, [assistantId, callState, vapi]);

  const primaryLabel = useMemo(() => {
    if (callState === 'in-call') return 'End Call';
    if (callState === 'connecting') return 'Connecting…';
    if (callState === 'ended') return 'Restart Call';
    if (callState === 'error') return 'Try Again';
    return 'Start Call';
  }, [callState]);

  const primaryIcon = useMemo(() => {
    if (callState === 'in-call' || callState === 'connecting')
      return <PhoneOff className="h-5 w-5" />;
    return <PhoneCall className="h-5 w-5" />;
  }, [callState]);

  return (
    <section className="rounded-3xl border border-white/10 px-6 py-10 text-white shadow-2xl">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Talk to Your <span className="text-primary">AI Dental Assistant</span>
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          Have a voice conversation with our AI assistant for dental advice and guidance
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <ParticipantCard
          name="DentWise AI"
          role="Dental Assistant"
          statusLabel={assistantSpeaking ? 'Speaking…' : callLabels[callState]}
          statusTone={
            callState === 'in-call' ? 'success' : callState === 'connecting' ? 'warning' : 'neutral'
          }
          glow
          accent="primary"
          isSpeaking={assistantSpeaking}
          icon={
            <Image
              alt="DentWise AI"
              src={'/logo.png'}
              width={64}
              height={64}
              className="object-cover"
            />
          }
        />
        <ParticipantCard
          name={user?.fullName || 'You'}
          role={callState === 'in-call' ? 'Live' : 'Ready to speak'}
          statusLabel={userSpeaking ? 'Speaking…' : callState === 'in-call' ? 'Connected' : 'Ready'}
          statusTone={callState === 'in-call' ? 'success' : 'neutral'}
          accent="blue"
          isSpeaking={userSpeaking}
          icon={
            user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt="User avatar"
                width={64}
                height={64}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <User className="h-14 w-14 text-cyan-300" />
            )
          }
        />
      </div>

      <div className="mt-10 flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={handleToggleCall}
          disabled={!vapi || !assistantId || callState === 'connecting'}
          className={cn(
            'rounded-full px-8 py-6 text-base font-semibold gap-2 text-white',
            isBusy ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90',
            'shadow-lg shadow-primary/30'
          )}
        >
          {primaryIcon}
          {primaryLabel}
        </Button>
        {!assistantId && (
          <p className="text-xs text-red-300">Set NEXT_PUBLIC_VAPI_ASSISTANT_ID to enable calls.</p>
        )}
        {error && <p className="text-xs text-red-300">{error}</p>}
        {!vapi && <p className="text-xs text-muted-foreground">Vapi loads on the client only.</p>}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-black/30 p-4 max-h-64 overflow-y-auto">
        <h3 className="text-sm font-semibold text-white/80 mb-3">Transcript</h3>
        {transcripts.length === 0 ? (
          <p className="text-xs text-muted-foreground">Start a call to see live transcript.</p>
        ) : (
          <ul className="space-y-2 text-sm">
            {transcripts.map((item, idx) => (
              <li
                key={idx}
                className="flex gap-2 rounded-lg bg-white/5 px-3 py-2 border border-white/5"
              >
                <span className="font-semibold text-primary shrink-0">{item.role}:</span>
                <span className="text-white/90">{item.text}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default VapiWidget;
