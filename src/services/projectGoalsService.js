const projectGoalsService = {
  filterProjectGoals: (projectGoals, searchTerm) => {
    let filtered = projectGoals;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((projectGoals) =>
        projectGoals.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProjectGoals: (projectGoals, sortOrder) => {
    return [...projectGoals].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProjectGoals: (projectGoals, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return projectGoals.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default projectGoalsService;