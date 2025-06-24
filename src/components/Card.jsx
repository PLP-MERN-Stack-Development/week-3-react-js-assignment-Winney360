import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;