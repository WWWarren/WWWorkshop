import React from 'react';
import { 
  ResponsiveContainer,
  ComposedChart, 
  XAxis,
  Tooltip
} from 'recharts';

// Component Imports
import { 
  AxisTick,
  Bars,
  ChartTooltip,
  ConfidenceBands,
  Lines,
  ReferenceLines,
  Yaxis
} from './ChartElements';
import { addConfidenceData } from './ChartElements/ConfidenceBands';

import css from './Chart.module.scss';


// Tooltip & Legend Creation Method
const createGraphElementsArrays = (
  b?: {}[], 
  l?: {
    name: string,
    confidence?: {
      percentage: number,
      fill: string,
    }[]
  }[]
) => {
  const values: {
    name?: string,
    fill?: string,
    stroke?: string,
    type: string,
  }[] = [];

  if (b) {
    b.forEach((v) => {
      values.push({ ...v, type: 'bar' });
    });
  } 
  
  if (l) {
    l.forEach((v) => {
      values.push({ ...v, type: 'line' });
      if (v.confidence) {
        v.confidence.forEach(c => {
          values.push({ name: `${v.name} ${c.percentage}%`, fill: c.fill, type: 'confidenceBand' });
        })
      }
    });
  }
  
  return values;
}


// Component
type BarLineChartProps = {
  configuration: {
    xAxisLabel?: string,
    yAxis?: {
      value?: [number, number],
      key: string,
      label: string,
      orientation?: string,
    }[] 
    barValues?: {
      name: string,
      fill: string,
      barTopValue?: string,
      orientation?: string,
    }[],
    lineValues?: {
      name: string, 
      stroke: string,
      strokeDasharray?: string,
      orientation?: string,
      confidence?: {
        fill: string,
        percentage: number,
      }[]
    }[],
    referenceLines?: {
      name: string,
      value: number,
      stroke: string,
      strokeDasharray?: string,
    }[],
    posttext?: {
      align: 'left',
      content: string,
    },
    pretext?: {
      align: 'left',
      content: string,
    },
  },
  data: {}[],
  preview?: boolean,
  chartHeight?: number,
  chartWidth?: number,
  xInterval?: number,
  download?: boolean,
};


export const Chart: React.FC<BarLineChartProps> = ({
  configuration,
  data,
  preview,
  chartHeight,
  chartWidth,
  xInterval,
  download,
}) => {
  const {
    xAxisLabel,
    yAxis,
    pretext,
    barValues,
    lineValues,
    referenceLines,
    posttext,
  } = configuration;

  const tooltip = createGraphElementsArrays(barValues, lineValues).filter(l => l.type !== 'confidenceBand');
  const legends = createGraphElementsArrays(barValues, lineValues);

  let values: {}[] = [ 
    ...data 
  ];
  if (lineValues && lineValues.find(l => l.confidence)) {
    values = addConfidenceData(data, lineValues);
  }

  return (
    <div className={`${css.chart_container} ${download ? css.download : ''}`}>
      {pretext && (
        <div
          className={css.chart_pretext}
          style={{ textAlign: pretext.align }}
        >
          {pretext.content}
        </div>
      )}
      <div className={css.chart}> 
      <ResponsiveContainer
        width={chartWidth || '100%'}
        height={chartHeight || 500}
      >
        <ComposedChart
          data={values}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {!preview ? 
            <XAxis
              dataKey='name'
              height={70}
              interval={xInterval}
              tick={<AxisTick />}
            /> :
            <XAxis dataKey='name' height={50} interval={xInterval} />
          }
          {yAxis && Yaxis(yAxis)}
          <Tooltip cursor={false} content={<ChartTooltip values={tooltip} />} />
          {barValues && Bars(barValues, preview, download)}
          {lineValues && Lines(lineValues, preview)}
          {lineValues && ConfidenceBands(lineValues)}
          {referenceLines && ReferenceLines(referenceLines, preview)}
        </ComposedChart>
      </ResponsiveContainer>
      </div>
      {xAxisLabel && (
        <div className={css.xAxis}>
          <div className={css.label}>{xAxisLabel}</div>
        </div>
      )}
      {legends.length > 0 && (
        <div className={css.legendContainer}>
          {legends.map(({ name, fill, stroke, type }) => (
            <div key={name} className={css.legend}>
              <div
                className={`${css.graphic} ${
                  type === 'line' ? css.line : css.bar
                }`}
                style={{
                  backgroundColor:
                    type === 'line' ? stroke || 'red' : fill || 'blue',
                }}
              />
              <div className={css.label}>{name}</div>
            </div>
          ))}
        </div>
      )}
      {posttext && (
        <div
          className={css.chart_posttext}
          style={{ textAlign: posttext.align }}
        >
          {posttext.content}
        </div>
      )}
    </div>
  )
}