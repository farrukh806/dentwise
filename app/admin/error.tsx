'use client';
export default function GlobalError({ error }: { error: Error }) {
  return <div>Something fatal went wrong: {error.message}</div>;
}
