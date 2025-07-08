import React from 'react';

interface SortVisualizerProps {
  array: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
}

const SortVisualizer: React.FC<SortVisualizerProps> = ({
  array,
  comparingIndices = [],
  swappingIndices = [],
  sortedIndices = [],
}) => {
  const maxValue = Math.max(...array);

  return (
    <div className="flex items-end h-64 w-full bg-gray-100 p-2 rounded-md">
      {array.map((value, index) => {
        const height = (value / maxValue) * 100;
        let barColor = 'bg-blue-500';

        if (comparingIndices.includes(index)) {
          barColor = 'bg-yellow-500'; // Comparing elements
        } else if (swappingIndices.includes(index)) {
          barColor = 'bg-red-500'; // Swapping elements
        } else if (sortedIndices.includes(index)) {
          barColor = 'bg-green-500'; // Sorted elements
        }

        return (
          <div
            key={index}
            className={`flex-1 mx-0.5 ${barColor} transition-all duration-100 ease-in-out`}
            style={{ height: `${height}%` }}
          >
            {/* Optional: Display value on top of bar */}
            {/* <span className="text-xs text-white absolute bottom-full left-1/2 -translate-x-1/2">{value}</span> */}
          </div>
        );
      })}
    </div>
  );
};

export default SortVisualizer;
