import React from 'react';
import DOMPurify from 'dompurify';

import { Config } from './TableInterfaces';

import styles from './TableRow.module.scss';

export function handleClick(
  data: { id: string },
  c: { type: string }, 
  onClickFunction?: (obj: typeof data) => void,
) {
  if (!onClickFunction) return null;

  if ((data.id && data.id === 'ghost') || c.type === 'section') {
    return null;
  }
  return onClickFunction(data)
}



// Component
type TableRowProps = {
  data: { 
    id: string,
    [key: string]: string,
  },
  columns: Config[],
  columnWidths: (col: Config[], min: number) => string,
  minColumnWidth: number,
  onClick?: () => void,
  section?: boolean,
};

export const TableRow: React.FC<TableRowProps> = ({
  data,
  columns,
  columnWidths,
  minColumnWidth,
  onClick,
  section,
}) => {
  return (
    <div
      className={`
        ${section ? styles.section : styles.tableRow}
        ${data.id && data.id === 'ghost' ? styles.ghost : ''}
      `}
      style={{
        gridTemplateColumns: columnWidths(columns, minColumnWidth),
        msGridColumns: columnWidths(columns, minColumnWidth),
        cursor: onClick ? 'pointer' : 'auto',
      }}
      data-testid={`${
        section ? `tableRowSection-${data.id}` : `tableRow-${data.id}`
      }`}
    >
      {columns.map((c, i) => (
        <div
          key={i}
          onClick={() => handleClick(data, c, onClick)}
          style={{
            textAlign: c.center || c.dataType === 'number' ? 'center' : 'left',
            minWidth: `${minColumnWidth}px`,
            // msGridColumn: i + 1,
          }}
          data-testid={`tableRow-${data.id}-${c.key}`}
        >
          {data.id !== 'ghost' && (
            <>
              {c.prefix && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.prefix),
                  }}
                />
              )}
              {data[c.key]}
              {c.suffix && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(c.suffix),
                  }}
                />
              )}
            </>
          )}
          {c.childElements && c.childElements.length > 0 && (
            <TableRow
              data={data}
              columns={c.childElements}
              columnWidths={columnWidths}
              minColumnWidth={minColumnWidth}
              onClick={onClick}
              data-testid='nestedTableRow'
              section
            />
          )}
        </div>
      ))}
    </div>
  );
}
