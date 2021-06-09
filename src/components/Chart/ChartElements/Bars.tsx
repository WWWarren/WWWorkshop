import React from 'react';
import { Bar, LabelList } from 'recharts';

const renderCustomBarLabel = (
  { x, y, width, value }: {
    x: number,
    y: number,
    width: number,
    value: number
  }
) => {
  let superChar;
  let index = 0;
  let valueToDisplay = String(value);
  if (valueToDisplay.indexOf('<sup>') >= 0) {
    index = valueToDisplay.indexOf('<sup>');
    superChar = valueToDisplay.charAt(index + 5);
    valueToDisplay = valueToDisplay.substring(0, index);
  }
  return (
    <g>
      <text
        dangerouslySetInnerHTML={{ __html: valueToDisplay }}
        x={x + width / 2}
        y={y - 10}
        fill='#222'
        textAnchor='middle'
        dominantBaseline='bottom'
      />
      {superChar && (
        <text
          dangerouslySetInnerHTML={{ __html: superChar }}
          x={x + (width / 2 + index * 4.4)}
          y={y - 13}
          fill='#222'
          textAnchor='middle'
          dominantBaseline='bottom'
          fontSize='10'
        />
      )}
    </g>
  );
};

export const Bars = (
  config: {
    name: string,
    fill: string,
    barTopValue?: string,
    orientation?: string,
  }[], 
  preview?: boolean, 
  download?: boolean
) => {
  if (!config) return null;

  return config.map(({ name, fill, barTopValue, orientation }) => (
    <Bar
      isAnimationActive={!download}
      dataKey={name}
      fill={fill || 'blue'}
      key={name}
      yAxisId={orientation || 'left'}
    >
      {barTopValue && !preview && (
        <LabelList
          dataKey={barTopValue}
          position='top'
          content={renderCustomBarLabel}
        />
      )}
    </Bar>
  ));
};