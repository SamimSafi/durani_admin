const bioService = {
  filterBio: (bio, searchTerm) => {
    let filtered = bio;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((bio) =>
        bio.key.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortBio: (bio, sortOrder) => {
    return [...bio].sort((a, b) => {
      const comparison = a.key.localeCompare(b.key);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateBio: (bio, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return bio.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default bioService;