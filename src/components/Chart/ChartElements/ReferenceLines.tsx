import React from 'react';
import { Label, ReferenceLine } from 'recharts';

export const ReferenceLines = (
  config: {
    name: string,
    value: number,
    stroke: string,
    strokeDasharray?: string,
  }[], 
  preview?: boolean
) => {
  if (!config) return null;

  return config.map((line, i) => (
    <ReferenceLine
      y={line.value}
      stroke={line.stroke || 'red'}
      strokeDasharray={line.strokeDasharray || '3 3'}
      key={i}
      strokeWidth={preview ? 1 : 2}
    >
      {!preview && <Label value={line.name} position='top' />}
    </ReferenceLine>
  ));
};