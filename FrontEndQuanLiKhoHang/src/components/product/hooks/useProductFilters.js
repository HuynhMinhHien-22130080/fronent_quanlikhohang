import { useState } from 'react';

export const useProductFilters = (products, setFilteredProducts) => {
  const [search, setSearch] = useState("");
  const [advanced, setAdvanced] = useState(false);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let result = [...products];

    if (search.trim() !== "") {
      const keyword = search.toLowerCase();
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(keyword)
      );
    }

    if (filters.slotRow) {
      result = result.filter((p) => p.slot?.row === filters.slotRow);
    }

    if (filters.slotColumn) {
      result = result.filter((p) => p.slot?.column === filters.slotColumn);
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= Number(filters.maxPrice));
    }

    if (filters.minTimeReceive) {
      result = result.filter(
        (p) =>
          p.timeReceive &&
          new Date(p.timeReceive) >= new Date(filters.minTimeReceive)
      );
    }

    if (filters.maxTimeReceive) {
      result = result.filter(
        (p) =>
          p.timeReceive &&
          new Date(p.timeReceive) <= new Date(filters.maxTimeReceive)
      );
    }

    if (filters.minTimeDelivery) {
      result = result.filter(
        (p) =>
          p.timeDelivery &&
          new Date(p.timeDelivery) >= new Date(filters.minTimeDelivery)
      );
    }

    if (filters.maxTimeDelivery) {
      result = result.filter(
        (p) =>
          p.timeDelivery &&
          new Date(p.timeDelivery) <= new Date(filters.maxTimeDelivery)
      );
    }

    setFilteredProducts(result);
  };

  const handleSearch = () => {
    applyFilters();
  };

  const clearFilters = () => {
    setSearch("");
    setFilters({});
    setFilteredProducts(products);
  };

  return {
    search,
    setSearch,
    advanced,
    setAdvanced,
    filters,
    handleFilterChange,
    handleSearch,
    applyFilters,
    clearFilters
  };
}; 