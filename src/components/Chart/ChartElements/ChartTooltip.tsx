import React from 'react';
import { TooltipProps } from 'recharts';
import {
  ValueType,
  NameType,
} from 'recharts/src/component/DefaultTooltipContent';
import DOMPurify from 'dompurify';

import styles from './ChartTooltip.module.scss';

export const ChartTooltip = ({ active, payload, values }: TooltipProps<ValueType, NameType>) => {
  if (!active || (!payload || payload.length === 0)) return null;

  function displayValues(chartPayload, chartConfig) {
    if (chartConfig) {
      return chartConfig.map((c, i) => {
        return (
          <div key={i}>
            <span>
              {c.name}
              :&nbsp;
            </span>
            {chartPayload[0].payload[c.name] || 'null'}
            <span
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(c.suffix) }}
            />
          </div>
        );
      });
    }
  }

  return (
    <div className={styles.tooltip}>
      <div className={styles.title}>{payload[0].payload.name}</div>
      <div className={styles.content}>{displayValues(payload, values)}</div>
    </div>
  )
}