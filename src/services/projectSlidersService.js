const projectSlidersService = {
  filterProjectSliders: (projectSliders, searchTerm) => {
    let filtered = projectSliders;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((projectSliders) =>
        projectSliders.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProjectSliders: (projectSliders, sortOrder) => {
    return [...projectSliders].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProjectSliders: (projectSliders, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return projectSliders.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default projectSlidersService;