import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ProductPagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  startIdx,
  itemsPerPage,
  filteredProducts,
  getPaginationRange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Hiển thị <span className="font-medium">{startIdx + 1}</span> đến{" "}
          <span className="font-medium">
            {Math.min(startIdx + itemsPerPage, filteredProducts.length)}
          </span>{" "}
          trong tổng số{" "}
          <span className="font-medium">{filteredProducts.length}</span>{" "}
          kết quả
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {getPaginationRange(totalPages).map((page, idx) => (
              <button
                key={idx}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  page === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : page === "..."
                    ? "text-gray-400 cursor-default"
                    : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
                onClick={() =>
                  typeof page === "number" && setCurrentPage(page)
                }
                disabled={page === "..."}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="p-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPagination; 