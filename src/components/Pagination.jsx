import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange,onNbParPage }) => {

  const totalPages = Math.max(0, Math.ceil((totalItems || 0) / itemsPerPage));
  if (totalPages <= 1) return null;

  return (

    <nav className="pagination is-centered mb-6" role="navigation" aria-label="pagination">

      <button 
        className="pagination-previous" 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>


      <button 
        className="pagination-next" 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next page
      </button>

      <ul className="pagination-list">
      { totalPages > 0 && [...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <li key={pageNumber}>
              <button
                className={`pagination-link ${currentPage === pageNumber ? 'is-current' : ''}`}
                aria-label={`Goto page ${pageNumber}`}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>
      <div>
        <div class="select">
  <select onChange={(e) => onNbParPage(e.target.value)} >
    <option value={4}>4</option>
    <option value={8}>8</option>
    <option value={12}>12</option>
    <option value={16}>16</option>
  </select>
</div>
      </div>
    </nav>
  );
};

export default Pagination;