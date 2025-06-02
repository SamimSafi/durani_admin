const productCategoryService = {
  filterProductCategory: (productCategory, searchTerm) => {
    let filtered = productCategory;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((productCategory) =>
        productCategory.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProductCategory: (productCategory, sortOrder) => {
    return [...productCategory].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProductCategory: (productCategory, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return productCategory.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default productCategoryService;