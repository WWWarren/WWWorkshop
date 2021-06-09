import React from 'react';
import { Line } from 'recharts';

export const Lines = (
  config: {
    name: string,
    stroke: string,
    strokeDasharray?: string,
    orientation?: string,
  }[], 
  preview?: boolean,
) => {
  if (!config) return null;

  return config.map(({ name, stroke, strokeDasharray, orientation }) => (
    <Line
      type='monotone'
      dataKey={name}
      yAxisId={orientation || 'left'}
      stroke={stroke || '#292E31'}
      strokeDasharray={strokeDasharray || null}
      strokeWidth={preview ? 1 : 2}
      dot
      key={name}
      isAnimationActive={false}
    />
  ))
};
