import React from 'react';
import { YAxis } from 'recharts';

export const Yaxis = (
  config: {
    value?: [number, number]
    key: string,
    label: string,
    orientation?: string,
  }[]
) => {
  if (!config) return <YAxis yAxisId='left' />;

  return config.map(({ value, key, label, orientation }, i: number) => (
    <YAxis
      domain={value}
      dataKey={key}
      yAxisId={orientation || 'left'}
      orientation={orientation || 'left'}
      label={{ 
        value: label, 
        angle: i > 0 ? 90 : -90, 
        position: i > 0 ? 'insideRight' : 'insideLeft' 
      }}
    />
  ))
}