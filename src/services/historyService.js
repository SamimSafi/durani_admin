const historyService = {
  filterHistory: (history, searchTerm) => {
    let filtered = history;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((history) =>
        history.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortHistory: (history, sortOrder) => {
    return [...history].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateHistory: (history, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return history.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default historyService;