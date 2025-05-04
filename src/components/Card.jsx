import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={twMerge(
        "bg-black-matte rounded-3xl overflow-hidden z-0 after:z-10 relative after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-0 -z-10 opacity-5"
      />
      {children}
    </div>
  );
});

export default Card;
