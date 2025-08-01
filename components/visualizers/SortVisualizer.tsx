import React from 'react';

interface SortVisualizerProps {
  array: number[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  timeComplexity?: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity?: string;
}

const SortVisualizer: React.FC<SortVisualizerProps> = ({
  array,
  comparingIndices = [],
  swappingIndices = [],
  sortedIndices = [],
  timeComplexity,
  spaceComplexity,
}) => {
  const maxValue = Math.max(...array);

  return (
    <div>
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
      {timeComplexity && spaceComplexity && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold">Complexity</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <h4 className="font-medium">Time Complexity</h4>
              <p>Best: {timeComplexity.best}</p>
              <p>Average: {timeComplexity.average}</p>
              <p>Worst: {timeComplexity.worst}</p>
            </div>
            <div>
              <h4 className="font-medium">Space Complexity</h4>
              <p>{spaceComplexity}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortVisualizer;
