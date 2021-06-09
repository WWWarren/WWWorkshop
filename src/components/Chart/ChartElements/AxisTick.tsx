import React from 'react';
import { TickProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/src/component/DefaultTooltipContent';

export const AxisTick = (
  { x, y, payload }: TickProps<ValueType, NameType> 
) => (
  <g transform={`translate(${x},${y})`}>
    <text
      x={0}
      y={0}
      dy={10}
      textAnchor="end"
      fill="#222222"
      transform="rotate(-20)"
    >
      {payload.value}
    </text>
  </g>
);
