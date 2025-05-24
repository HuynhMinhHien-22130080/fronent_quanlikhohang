export const getStockDisplay = (stock) => {
  if (stock === 0) {
    return { value: "0", className: "text-red-600 font-semibold" };
  }

  if (stock <= 10) {
    return { value: stock.toString(), className: "text-orange-600 font-semibold" };
  }

  return { value: stock.toString(), className: "text-gray-900 font-semibold" };
};

export const formatPrice = (price) => {
  return price != null ? `$${Number(price).toFixed(2)}` : "-";
};

export const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString() : "-";
};

export const getWarehouseBadge = (warehouseId) => {
  return {
    text: `WH-${warehouseId}`,
    className: "bg-blue-100 text-blue-800 border-blue-200"
  };
};

export const getSlotBadge = (slot) => {
  return {
    text: `${slot?.row}-${slot?.column}`,
    className: "bg-purple-100 text-purple-800 border-purple-200"
  };
}; 