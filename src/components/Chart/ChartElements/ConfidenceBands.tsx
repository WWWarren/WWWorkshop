import React from 'react';
import { Area } from 'recharts';

export const addConfidenceData = (data, config) => {
  return data.map(d => {
    let obj = {
      ...d,
    }

    // Loop through each line in config
    config.forEach(c => {
      if (c.confidence) {
        // Loop through confidence array within the line
        c.confidence.forEach(con => {
          obj = {
            ...obj,
            [`${c.name} ${con.percentage}`]: 
              [(d[c.name]/100) * (100 - con.percentage), (d[c.name]/100) * (100 + con.percentage)]
          }
        })
      }
    })

    return obj;
  })
}

export const ConfidenceBands = (
  config: {
    name: string,
    orientation?: string,
    confidence?: {
      percentage: number,
      fill: string,
    }[]
  }[], 
) => {
  if (!config) return null;

  let bands: {}[] = [];
  config.forEach((lKey) => {
    if (lKey.confidence) {
      const sortConfidenceArray = [
        ...lKey.confidence
      ];
      sortConfidenceArray.sort((a: any, b: any) => b.percentage - a.percentage);

      const band = 
        sortConfidenceArray.map(({ percentage, fill }) => (
          <Area 
            type='monotone'
            dataKey={`${lKey.name} ${percentage}`}
            key={`${lKey.name} ${percentage}`}
            yAxisId={lKey.orientation || 'left'}
            dot={false}
            activeDot={false}
            stroke='none'
            fill={fill || "#8884d8"}
            isAnimationActive={false}
            connectNulls
          />
        ));
      bands = [
        ...bands,
        ...band
      ]
    }
  })
  return bands;
}