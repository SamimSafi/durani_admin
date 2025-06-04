const sloganService = {
  filterSlogan: (slogan, searchTerm) => {
    let filtered = slogan;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((slogan) =>
        slogan.pageName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortSlogan: (slogan, sortOrder) => {
    return [...slogan].sort((a, b) => {
      const comparison = a.pageName.localeCompare(b.pageName);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateSlogan: (slogan, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return slogan.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default sloganService;