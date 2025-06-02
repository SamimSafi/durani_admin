const slidersService = {
  filterSliders: (sliders, searchTerm) => {
    let filtered = sliders;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((sliders) =>
        sliders.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortSliders: (sliders, sortOrder) => {
    return [...sliders].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateSliders: (sliders, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return sliders.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default slidersService;