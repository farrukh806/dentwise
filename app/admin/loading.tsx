import { LoaderCircle } from 'lucide-react';
import React from 'react';

const loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderCircle size={50} className="animate-spin" />
    </div>
  );
};

export default loading;
