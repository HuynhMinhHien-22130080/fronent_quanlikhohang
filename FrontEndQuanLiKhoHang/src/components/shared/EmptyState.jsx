import React from 'react';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description,
  iconClassName = "text-gray-400",
  iconContainerClassName = "p-3 bg-gray-100 rounded-full"
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {Icon && (
        <div className={iconContainerClassName}>
          <Icon className={`w-8 h-8 ${iconClassName}`} />
        </div>
      )}
      <div>
        <p className="text-lg font-medium text-gray-900">{title}</p>
        {description && (
          <p className="text-gray-500">{description}</p>
        )}
      </div>
    </div>
  );
};

export default EmptyState; 