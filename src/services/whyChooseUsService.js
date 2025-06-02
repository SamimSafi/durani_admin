const whyChooseUsService = {
  filterWhyChooseUs: (whyChooseUs, searchTerm) => {
    let filtered = whyChooseUs;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((whyChooseUs) =>
        whyChooseUs.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortWhyChooseUs: (whyChooseUs, sortOrder) => {
    return [...whyChooseUs].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateWhyChooseUs: (whyChooseUs, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return whyChooseUs.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default whyChooseUsService;