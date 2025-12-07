export const PRICING = [
  {
    title: 'Free',
    price: '$0',
    duration: 'month',
    description: 'Essential dental appointment booking',
    ctaText: 'Get Started Free',
    features: [
      'Unlimited appointment booking',
      'Find dentists in your area',
      'Basic text chat support',
      'Appointment reminders',
    ],
  },
  {
    title: 'AI Basic',
    price: '$9',
    duration: 'month',
    ctaText: 'Start AI Basic',
    description: 'AI consulatations + appointment booking',
    isPopular: true,
    features: [
      'Everything in Free',
      '10 AI voice calls per month',
      'AI dental guidance and advice',
      'Symptom assesment',
      'Priority support',
      'Call history and recording',
    ],
  },
  {
    title: 'AI Pro',
    price: '$19',
    duration: 'month',
    ctaText: 'Start AI Pro',
    description: 'Unlimited AI consulatations',
    features: [
      'Everything in AI Basic',
      'Unlimited AI voice calls',
      'Advanced dental analysis',
      'Personalized care plans',
      '24/7 priority AI support',
      'Detailed health reports',
    ],
  },
];

export const PLANS = {
  FREE: 'free',
  AI_BASIC: 'ai_basic',
  AI_PRO: 'ai_pro',
};
