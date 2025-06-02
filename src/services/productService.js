const productService = {
  filterProduct: (product, searchTerm) => {
    let filtered = product;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProduct: (product, sortOrder) => {
    return [...product].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProduct: (product, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return product.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default productService;