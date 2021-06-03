import React, { useState } from 'react';
import { Scrollbar } from 'react-scrollbars-custom';

import { listToTree, sortData } from '../../utils/list';

import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TablePaging } from './TablePaging';
import { Config } from './TableInterfaces';

import styles from './Table.module.scss';

function createColumns(
  columns: Config[], 
  minColumnWidth: number,
): string {
  let columnString = '';
  columns.forEach((c) => {
    const existingString = columnString ? `${columnString} ` : '';
    if (c.width) {
      columnString = `${existingString}${c.width}px`;
    } else {
      const childElements =
        c.childElements && c.childElements.length > 0
          ? c.childElements.length
          : 1;
      columnString = `${existingString}minmax(${
        (minColumnWidth * childElements) + (c.type === 'section' ? ((childElements * 30) - 30) : 0) 
      }px, ${childElements}fr)`;
    }
  });
  return columnString;
}

function addGhostRows(
  rows: { id: string }[], 
  numberOfRowsPerPage: number, 
  data: {}[],
): { id: string }[] {
  const differenceInRows = numberOfRowsPerPage - data.length;

  const array2 = [...new Array(differenceInRows)];
  const addDetails = array2.map(() => {
    return {
      id: 'ghost',
    };
  });

  return [...rows, ...addDetails];
}

function calculateMinWidth(
  config: Config[], 
  minColumnWidth: number,
): string {
  let minWidth = 0;

  // Calcuate total width of columns
  config.forEach((c) => {
    if (c.type === 'column') {
      minWidth = c.width
        ? minWidth + Number(c.width)
        : minWidth + minColumnWidth;
    }
  });

  // Add column gap width
  minWidth += config.length * 30;
  return `${minWidth}px`;
}



// Component
type TableProps = {
  config: Config[],
  data: {
    id: string,
  }[],
  minColumnWidth?: number,
  onColumnSort?: (obj: object) => void,
  sortWithinTable?: boolean,
  defaultSortKey?: string,
  defaultSortOrder?: boolean,
  onClick?: () => void,
  errorMessage?: string,
  noResultsMessage?: string,
  numberOfRowsPerPage?: number,
};

export const Table: React.FC<TableProps> & {
  Paging: typeof TablePaging,
} = ({
  config,
  data,
  minColumnWidth = 100,
  onColumnSort,
  sortWithinTable,
  defaultSortKey = 'id',
  defaultSortOrder = true,
  onClick,
  errorMessage,
  noResultsMessage,
  children,
  numberOfRowsPerPage,
}) => {
  const [sort, setSortState] = useState<{
    sortKey: string,
    sortType: string | null,
    ascendingSort: boolean,
  }>({
    sortKey: defaultSortKey,
    sortType: null,
    ascendingSort: defaultSortOrder,
  });

  // Display message if no table config or data
  if (!config || !data) return <div>{errorMessage}</div>;

  // Handle sorting of data in table
  function setSort(
    sortObj: {
      sortKey: string,
      sortType: string | null,
    }
  ) {
    const obj = {
      ...sortObj,
      ascendingSort:
        sort.sortKey === sortObj.sortKey ? !sort.ascendingSort : true,
    };

    setSortState(obj);
    if (!sortWithinTable && onColumnSort) {
      onColumnSort(obj); 
    }
  }

  function sortDataInTable(
    d: {}[]
  ): { id: string }[] {
    return sortData(
      d,
      sort.sortKey,
      sort.sortType,
      sort.ascendingSort
    );
  }

  let sortedData = data;
  // sort data within table if enabled
  if (sortWithinTable) {
    sortedData = sortDataInTable(data);
  }

  // Check if nesting is needed for the table
  const nested = config.find((c) => c.type === 'section');

  // Adds ghost rows to data if needed
  if (numberOfRowsPerPage && data.length < numberOfRowsPerPage) {
    sortedData = addGhostRows(sortedData, numberOfRowsPerPage, data);
  }

  // Composition stuff. Can be expanded with more features
  const paging = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TablePaging
  );
  
  return (
    <div
      className={`
        ${styles.tableContainer}
      `}
    >
      <Scrollbar
        style={{ width: '100%', height: '100%' }}
        translateContentSizeYToHolder
        disableTracksWidthCompensation
        contentProps={{
          className: styles.table
        }}
      >
        <div
          style={{
            width: '100%',
            minWidth: calculateMinWidth(config, minColumnWidth),
            paddingBottom: '5px',
          }}
          data-testid='table'
        >
          <TableHeader
            columns={nested ? listToTree(config, true)! : config}
            columnWidths={createColumns}
            minColumnWidth={minColumnWidth}
            onSort={setSort}
            sortState={sort}
          />
          <div className={styles.tableContent}>
            {sortedData.length === 0 && (
              <div>{noResultsMessage}</div>
            )}
            {sortedData.map((d, i) => (
              <TableRow
                key={i}
                data={d}
                columns={nested ? listToTree(config, true)! : config}
                columnWidths={createColumns}
                minColumnWidth={minColumnWidth}
                onClick={onClick}
              />
            ))}
          </div>
        </div>
      </Scrollbar>
      {paging && paging.length > 0 && <>{paging[0]}</>}
    </div>
  );
}

Table.Paging = TablePaging;
