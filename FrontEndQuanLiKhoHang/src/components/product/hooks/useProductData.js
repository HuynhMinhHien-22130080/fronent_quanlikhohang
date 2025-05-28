import { useState, useEffect } from "react";
import { productApi } from "../../../services/api";

const validateNumber = (value, fallback = 0) => {
  const num = Number(value);
  return !isNaN(num) ? num : fallback;
};

const validateDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  return date instanceof Date && !isNaN(date) ? date : null;
};

const validateArray = (value) => {
  return Array.isArray(value) ? value : [];
};

export const useProductData = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [conditions, setConditions] = useState({
    slotRows: [],
    slotColumns: [],
    priceRanges: { minPrice: 0, maxPrice: 0 },
    timeReceiveRanges: { minTimeReceive: null, maxTimeReceive: null },
    timeDeliveryRanges: { minTimeDelivery: null, maxTimeDelivery: null },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 10000)
      );

      const [conditionsRes, productsRes] = await Promise.race([
        Promise.all([
          productApi.getSearchConditions(),
          productApi.getProducts(),
        ]),
        timeoutPromise,
      ]);

      const {
        slotRows = [],
        slotColumns = [],
        priceRanges = {},
        timeReceiveRanges = {},
        timeDeliveryRanges = {},
      } = conditionsRes?.data?.data || {};

      const processedConditions = {
        slotRows: validateArray(slotRows),
        slotColumns: validateArray(slotColumns),
        priceRanges: {
          minPrice: validateNumber(priceRanges?.minPrice),
          maxPrice: validateNumber(priceRanges?.maxPrice),
        },
        timeReceiveRanges: {
          minTimeReceive: validateDate(timeReceiveRanges?.minTimeReceive),
          maxTimeReceive: validateDate(timeReceiveRanges?.maxTimeReceive),
        },
        timeDeliveryRanges: {
          minTimeDelivery: validateDate(timeDeliveryRanges?.minTimeDelivery),
          maxTimeDelivery: validateDate(timeDeliveryRanges?.maxTimeDelivery),
        },
      };

      const rawProducts = productsRes?.data || [];

      const processedProducts = rawProducts.map((product, index) => {
        const processed = {
          ...product,
          productId: product.productId || `temp-${index}`,
          productName: product.productName || "Unnamed Product",
          price: validateNumber(product.price),
          stock: validateNumber(product.stock),
          timeReceive: validateDate(product.timeReceive),
          timeDelivery: validateDate(product.timeDelivery),
          description: product.description || "",
          warehouseId: product.warehouseId || null,
          slot: product.slot || null,
        };

        if (
          !processed.productName ||
          processed.price < 0 ||
          processed.stock < 0
        ) {
          console.warn("Invalid product data:", product);
        }

        return processed;
      });

      setConditions(processedConditions);
      setProducts(processedProducts);
      setFilteredProducts(processedProducts);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      setProducts([]);
      setFilteredProducts([]);
      setConditions({
        slotRows: [],
        slotColumns: [],
        priceRanges: { minPrice: 0, maxPrice: 0 },
        timeReceiveRanges: { minTimeReceive: null, maxTimeReceive: null },
        timeDeliveryRanges: { minTimeDelivery: null, maxTimeDelivery: null },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); 

    const interval = setInterval(fetchData, 3000*1000); 

    return () => clearInterval(interval);
  }, []);

  return {
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    conditions,
    loading,
    error,
  };
};
