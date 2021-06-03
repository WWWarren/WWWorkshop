import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './TablePaging.module.scss';

type TablePagingProps = {
  page: number,
  onPageClick: () => void,
  resultsText: string,
  totalNumberOfPages: number,
  onlyShowResults: boolean,
};

export const TablePaging: React.FC<TablePagingProps> = ({
  page,
  onPageClick,
  resultsText,
  totalNumberOfPages,
  onlyShowResults,
}) => {
  return (
    <div className={styles.tablePagingContainer}>
      {resultsText && <div>{resultsText}</div>}
      {!onlyShowResults && (
        <ReactPaginate
          pageCount={totalNumberOfPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={1}
          initialPage={page}
          forcePage={page}
          onPageChange={onPageClick}
          containerClassName={styles.container}
          pageClassName={styles.button}
          previousClassName={styles.button}
          nextClassName={styles.button}
          pageLinkClassName={styles.buttonLink}
          activeLinkClassName={styles.buttonLinkActive}
          previousLinkClassName={styles.buttonLink}
          nextLinkClassName={styles.buttonLink}
          breakClassName={styles.break}
          previousLabel={<span className={styles.prev} />}
          nextLabel={<span className={styles.next} />}
        />
      )}
    </div>
  );
}