import React, { useState } from 'react';
import '../css/pagination.css';

const CustomPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <button
        key={i}
        className={`page-item ${i === currentPage ? 'active' : ''}`}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        className="page-item"
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        «
      </button>
      {paginationItems}
      <button
        className="page-item"
        onClick={() =>
          handlePageChange(Math.min(currentPage + 1, totalPages))
        }
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default CustomPagination;
