const projectFinalOutcomesService = {
  filterProjectFinalOutcomes: (projectFinalOutcomes, searchTerm) => {
    let filtered = projectFinalOutcomes;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((projectFinalOutcomes) =>
        projectFinalOutcomes.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProjectFinalOutcomes: (projectFinalOutcomes, sortOrder) => {
    return [...projectFinalOutcomes].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProjectFinalOutcomes: (projectFinalOutcomes, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return projectFinalOutcomes.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default projectFinalOutcomesService;