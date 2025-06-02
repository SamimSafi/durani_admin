const projectCategoriesService = {
  filterProjectCategories: (projectCategories, searchTerm) => {
    let filtered = projectCategories;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((projectCategories) =>
        projectCategories.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProjectCategories: (projectCategories, sortOrder) => {
    return [...projectCategories].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProjectCategories: (projectCategories, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return projectCategories.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default projectCategoriesService;