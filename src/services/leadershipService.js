const leadershipService = {
  filterLeadership: (leadership, searchTerm) => {
    let filtered = leadership;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((leadership) =>
        leadership.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortLeadership: (leadership, sortOrder) => {
    return [...leadership].sort((a, b) => {
      const comparison = a.fullName.localeCompare(b.fullName);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateLeadership: (leadership, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return leadership.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default leadershipService;