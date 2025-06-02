const contentService = {
  filterContent: (content, searchTerm) => {
    let filtered = content;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((content) =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortContent: (content, sortOrder) => {
    return [...content].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateContent: (content, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return content.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default contentService;