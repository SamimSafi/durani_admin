const partnershipService = {
  filterPartnership: (partnership, searchTerm) => {
    let filtered = partnership;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((partnership) =>
        partnership.link.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortPartnership: (partnership, sortOrder) => {
    return [...partnership].sort((a, b) => {
      const comparison = a.link.localeCompare(b.link);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginatePartnership: (partnership, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return partnership.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default partnershipService;