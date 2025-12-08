import Vapi from '@vapi-ai/web';

export const createVapiClient = () => {
  if (typeof window === 'undefined') return null;
  const apiKey = process.env.NEXT_PUBLIC_VAPI_API_KEY;
  if (!apiKey) {
    console.warn('NEXT_PUBLIC_VAPI_API_KEY is not set.');
    return null;
  }
  return new Vapi(apiKey);
};
