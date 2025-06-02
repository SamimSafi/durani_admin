const projectsService = {
  filterProjects: (projects, searchTerm) => {
    let filtered = projects;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((projects) =>
        projects.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortProjects: (projects, sortOrder) => {
    return [...projects].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateProjects: (projects, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return projects.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default projectsService;