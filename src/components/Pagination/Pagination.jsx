import React from 'react';
import ReactPaginate from "react-paginate";
import s from './pagination.module.scss'

const Pagination = ({setCurrentPage, currenPage}) => {
  return (
      <div>
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">>>"
            onPageChange={e=>setCurrentPage(e.selected+1)}
            pageRangeDisplayed={4}
            forcePage={currenPage - 1}
            pageCount={2}
            previousLabel="<<<"
            renderOnZeroPageCount={null}
        />
      </div>
  );
};

export default Pagination;