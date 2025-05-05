import React from 'react';

const ViewLiveSite = ({ href = '#' }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 bg-white hover:bg-white/60 text-black font-medium px-4 py-2 rounded-lg transition duration-300"
    >
      <span>View Live Site</span>
      <img src="/images/arrow-up-right.svg" alt="View" className="w-4 h-4" />
    </a>
  );
};

export default ViewLiveSite;
