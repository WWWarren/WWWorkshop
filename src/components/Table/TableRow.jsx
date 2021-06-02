import React from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';

import styles from './TableRow.module.scss';

export function onClickRow(onClick, data, column) {
  if (!onClick) return null;

  if ((data.id && data.id === 'ghost') || column.type === 'section') {
    return null;
  }
  return () => onClick(data)
}

export function TableRow({
  data,
  columns,
  columnWidths,
  minColumnWidth,
  onClick,
  section,
}) {
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
          onClick={onClickRow(onClick, data, c)}
          style={{
            textAlign: c.center || c.dataType === 'number' ? 'center' : '',
            minWidth: `${minColumnWidth}px`,
            msGridColumn: i + 1,
          }}
          data-testid={`tableRow-${data.id}-${c.key}`}
        >
          {data[c.key] && data.id !== 'ghost' && (
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

TableRow.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.array,
  columnWidths: PropTypes.func,
  minColumnWidth: PropTypes.number,
  onClick: PropTypes.func,
  section: PropTypes.bool,
};
