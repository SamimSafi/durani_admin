const servicesService = {
  filterServices: (services, searchTerm) => {
    let filtered = services;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((services) =>
        services.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortServices: (services, sortOrder) => {
    return [...services].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateServices: (services, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return services.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default servicesService;