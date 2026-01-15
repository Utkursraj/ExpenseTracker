import React from 'react';

// FIX: Added default value '[]' to payload to prevent crashes if data is missing
const CustomLegend = ({ payload = [] }) => {
  return (
    // FIX: Removed 'space-x-6' and increased gap to 'gap-5' for cleaner spacing
    <div className='flex flex-wrap justify-center gap-5 mt-4'>
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className='flex items-center space-x-2'>
          <div 
            className='w-2.5 h-2.5 rounded-full' 
            style={{ backgroundColor: entry.color }}
          />
          <span className='text-xs text-gray-700 font-medium'>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;