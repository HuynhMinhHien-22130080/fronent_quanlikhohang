import { useState } from 'react';

export const usePagination = (itemsPerPage = 8) => {
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginationRange = (totalPages) => {
    const range = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        range.push(1);
        range.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) range.push(i);
      } else {
        range.push(1);
        range.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) range.push(i);
        range.push("...");
        range.push(totalPages);
      }
    }

    return range;
  };

  const getCurrentItems = (items) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return items.slice(startIdx, startIdx + itemsPerPage);
  };

  const getTotalPages = (totalItems) => {
    return Math.ceil(totalItems / itemsPerPage);
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    getPaginationRange,
    getCurrentItems,
    getTotalPages
  };
}; 