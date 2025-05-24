import React from "react";
import ProductHeader from "./ProductHeader";
import ProductStats from "./ProductStats";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTable";
import ProductPagination from "./ProductPagination";
import { useProductData } from "./hooks/useProductData";
import { useProductFilters } from "./hooks/useProductFilters";
import { usePagination } from "./hooks/usePagination";

const ProductList = () => {
  const {
    products,
    filteredProducts,
    setFilteredProducts,
    conditions,
    loading
  } = useProductData();

  const {
    search,
    setSearch,
    advanced,
    setAdvanced,
    filters,
    handleFilterChange,
    handleSearch,
    applyFilters,
    clearFilters
  } = useProductFilters(products, setFilteredProducts);

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    getPaginationRange,
    getCurrentItems,
    getTotalPages
  } = usePagination();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentItems = getCurrentItems(filteredProducts);
  const totalPages = getTotalPages(filteredProducts.length);
  const startIdx = (currentPage - 1) * itemsPerPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <ProductHeader />
        <ProductStats products={products} filteredProducts={filteredProducts} />

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <ProductSearch
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            advanced={advanced}
            setAdvanced={setAdvanced}
            filters={filters}
            handleFilterChange={handleFilterChange}
            conditions={conditions}
            applyFilters={applyFilters}
            clearFilters={clearFilters}
          />

          <ProductTable
            currentItems={currentItems}
            startIdx={startIdx}
          />

          <ProductPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            startIdx={startIdx}
            itemsPerPage={itemsPerPage}
            filteredProducts={filteredProducts}
            getPaginationRange={getPaginationRange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
