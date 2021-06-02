import React from 'react';
import PropTypes from 'prop-types';

import styles from './TableHeader.module.scss';

export function TableHeader({ 
  columns, 
  columnWidths,
  minColumnWidth,
  onSort,
  sortState,
}){
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
              msGridColumn: i + 1
            }}
            onClick={c.type === 'column' ? () => onSort({ sortKey: c.key, sortType: c.dataType }) : null}
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

TableHeader.propTypes = {
  columns: PropTypes.array,
  columnWidths: PropTypes.func,
  minColumnWidth: PropTypes.number,
  onSort: PropTypes.func,
  sortState: PropTypes.object,
};