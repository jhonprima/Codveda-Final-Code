import { Pagination as BootstrapPagination } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="d-flex justify-content-center mt-4">
      <BootstrapPagination>
        <BootstrapPagination.First 
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <BootstrapPagination.Prev 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {startPage > 1 && (
          <>
            <BootstrapPagination.Item onClick={() => onPageChange(1)}>
              1
            </BootstrapPagination.Item>
            {startPage > 2 && <BootstrapPagination.Ellipsis disabled />}
          </>
        )}

        {pages.map((page) => (
          <BootstrapPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => onPageChange(page)}
          >
            {page}
          </BootstrapPagination.Item>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <BootstrapPagination.Ellipsis disabled />}
            <BootstrapPagination.Item onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </BootstrapPagination.Item>
          </>
        )}

        <BootstrapPagination.Next 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <BootstrapPagination.Last 
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </BootstrapPagination>
    </div>
  );
};

export default Pagination;