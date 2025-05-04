import React from 'react';
import { twMerge } from 'tailwind-merge';

const CardHeader = ({ title, description, className }) => {
  return (
    <div className={twMerge("flex flex-col p-6 md:py-8 md:px-10", className)}>
      <div className="inline-flex items-start gap-2">
        <h3 className="text-white text-2xl font-semibold mt-2">
          {title}
        </h3>
      </div>
      <p className="text-white-50 text-lg mt-2">
        {description}
      </p>
    </div>
  );
};

export default CardHeader;
