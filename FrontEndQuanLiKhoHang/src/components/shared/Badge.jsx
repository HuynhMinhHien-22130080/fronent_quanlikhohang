import React from 'react';

const Badge = ({ text, className, ...props }) => {
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}
      {...props}
    >
      {text}
    </span>
  );
};

export default Badge; 