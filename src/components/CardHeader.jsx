import React from 'react';
import { twMerge } from 'tailwind-merge';

const CardHeader = ({ title, description, className }) => {
  return (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10", className)}>
      <div className="inline-flex items-center gap-2">
        <h3 className="text-xl text-center">
          {title}
        </h3>
      </div>
      <p className="text-sm lg:text-base max-w-xs text-white/50 mt-2">
        {description}
      </p>
    </div>
  );
};

export default CardHeader;
