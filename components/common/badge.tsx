import React, { ReactNode } from 'react';

const Badge: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm">
      {children}
    </div>
  );
};

export default Badge;
