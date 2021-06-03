import React from 'react';

import { Config } from './TableInterfaces';

import styles from './TableHeader.module.scss';

export function handleClick(
  c: { 
    type: string,
    key: string,
    dataType?: string,
  }, 
  onSortFunction: (obj: {
    sortKey: string,
    sortType: string,
  }) => void,
) {
  if (c.type === 'column' && c.dataType) { 
    return onSortFunction({ sortKey: c.key, sortType: c.dataType })
  }
  return null;
}


// Component
type TableHeaderProps = {
  columns: Config[],
  columnWidths: (columns: Config[], min: number) => string,
  minColumnWidth: number,
  onSort: (obj: {
    sortKey: string,
    sortType: string | null,
  }) => void,
  sortState: {
    sortKey: string,
    ascendingSort: boolean,
  },
};

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  columns, 
  columnWidths,
  minColumnWidth,
  onSort,
  sortState,
}) => {
  return (
    <div
      className={styles.tableHeader}
      style={{
        gridTemplateColumns: columnWidths(columns, minColumnWidth),
        msGridColumns: columnWidths(columns, minColumnWidth),
      }}
      data-testid='tableHeaderWrapper'
    >
      {
        columns.map((c, i) => (
          <div 
            key={i}
            className={`
              ${(c.childElements && c.childElements.length > 0) && c.label ? styles.sectionHeader : ''}
            `}
            style={{
              textAlign: 'center',
              minWidth: `${minColumnWidth}px`,
              // msGridColumn: i + 1
            }}
            onClick={() => handleClick(c, onSort)}
            data-testid={`tableHeader-${c.id}`}
          >
            <span>
              {c.label}
            </span>
            {sortState.sortKey && sortState.sortKey === c.key && (
              <span
                className={`
                  ${styles.sortArrow}
                  ${sortState.ascendingSort ? styles.up : styles.down}
                `}
              />
            )}
            {
              (c.childElements && c.childElements.length > 0) &&
                <TableHeader 
                  columns={c.childElements} 
                  columnWidths={columnWidths} 
                  minColumnWidth={minColumnWidth}
                  onSort={onSort} 
                  sortState={sortState} 
                  data-testid='nestedTableHeader' 
                />
            }
          </div>
        ))
      }
    </div>
  )
}