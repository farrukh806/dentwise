import React from 'react';
import Badge from '../common/badge';
import { MessageCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Question from './question';

const QUESTIONS = [
  {
    q: '"My tooth hurts when I bite donw"',
    answer:
      'Get immediate advice on pain management, possible causes, and when to see a doctor urgently',
    badges: ['Instant response', 'Pain relief'],
  },
  {
    q: '"How often should I get a dental check-up?"',
    answer:
      'Learn about recommended check-up intervals based on your age, oral health, and risk factors',
    badges: ['Personalized advice', 'Preventive care'],
  },
  {
    q: '"What are the treatment options for cavities?"',
    answer:
      'Explore various treatment methods for cavities, including fillings, crowns, and preventive measures',
    badges: ['Comprehensive info', 'Treatment options'],
  },
];

const WhatToAsk = () => {
  return (
    <section className="container mx-auto my-15 px-4 sm:px-6 lg:px-10">
      <div className="text-center">
        <Badge>
          <MessageCircleIcon color="var(--primary)" className="mr-2 h-4 w-4" />
          <span className="text-primary text-sm">AI-Powered Conversations</span>
        </Badge>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-3">
          Ask about <br />
          <span className="text-primary">anything dental</span>
        </h2>
        <p className="mt-3 text-muted-foreground text-lg">
          From simple questions to complex concerns, our AI delivers <br />
          expert level guidance trained on thousands of real dental cases
        </p>
      </div>
      <div className="grid md:grid-cols-2 items-center mt-15 xl:mt-0">
        {/* Left side */}
        <div className="space-y-6 md:space-y-8 lg:space-y-10">
          <h3 className="text-lg font-bold mb-4">Common questions our AI answers:</h3>
          {QUESTIONS.map((item, index) => (
            <Question key={index} {...item} />
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:block">
          <Image
            src={'/confused.png'}
            alt="Confused person"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default WhatToAsk;
