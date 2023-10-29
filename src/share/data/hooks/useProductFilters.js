
import { useState } from 'react';

function useProductFilters(products) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filter, setFilter] = useState(false);
  

  const filterByCategory = (category) => {
    const filtered = products.filter(product => product.category === category);
    setFilteredProducts(filtered);
    setFilter(true);
  };
  

  const filterByPrice = (minPrice, maxPrice) => {
    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : Infinity;
      const filtered = products.filter(product => (product.price >= min) && (product.price <= max));
      setFilteredProducts(filtered.sort((a, b) => a.price - b.price));
      setFilter(true);
    }
  };


  const filterByStock = (stockType) => {
    const filtered = stockType === 'en-stock' ? products.filter(product => product.stock > 0) : products.filter(product => product.stock === 0);
    setFilteredProducts(filtered);
    setFilter(true);
  };
  

  const restoreFilters = () => {
    setFilteredProducts(products);
    setFilter(false);
  }

  return {
    filteredProducts,
    filter,
    filterByCategory,
    filterByPrice,
    filterByStock,
    restoreFilters,
  };
}

export default useProductFilters;
