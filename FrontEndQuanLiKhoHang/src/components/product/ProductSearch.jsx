import React from "react";
import { Search, Filter } from "lucide-react";

const ProductSearch = ({
  search,
  setSearch,
  handleSearch,
  advanced,
  setAdvanced,
  filters,
  handleFilterChange,
  conditions,
  applyFilters,
  clearFilters,
}) => {
  return (
    <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div className="space-y-4">
        {/* Main Search */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium shadow-sm"
            >
              Tìm Kiếm
            </button>
            <button
              onClick={() => setAdvanced(!advanced)}
              className="px-4 py-3 text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {advanced ? "Ẩn" : "Nâng Cao"}
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {advanced && (
          <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-700">
                Bộ Lọc Nâng Cao
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {conditions.slotRows?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hàng Kệ
                  </label>
                  <select
                    name="slotRow"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.slotRow || ""}
                    onChange={handleFilterChange}
                  >
                    <option value="">Tất Cả Hàng</option>
                    {conditions.slotRows.map((row) => (
                      <option key={row} value={row}>
                        {row}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {conditions.slotColumns?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cột Kệ
                  </label>
                  <select
                    name="slotColumn"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.slotColumn || ""}
                    onChange={handleFilterChange}
                  >
                    <option value="">Tất Cả Cột</option>
                    {conditions.slotColumns.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng Giá
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Tối thiểu"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.minPrice || ""}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Tối đa"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.maxPrice || ""}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng Thời Gian Nhập
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="minTimeReceive"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.minTimeReceive || ""}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="date"
                    name="maxTimeReceive"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.maxTimeReceive || ""}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Khoảng Thời Gian Xuất
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="minTimeDelivery"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.minTimeDelivery || ""}
                    onChange={handleFilterChange}
                  />
                  <input
                    type="date"
                    name="maxTimeDelivery"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    value={filters.maxTimeDelivery || ""}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all font-medium shadow-sm"
                onClick={applyFilters}
              >
                Áp Dụng Bộ Lọc
              </button> 
              <button
                className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium"
                onClick={clearFilters}
              >
                Xóa Tất Cả
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
