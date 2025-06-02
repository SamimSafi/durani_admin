const successSnapshotsService = {
  filterSuccessSnapshots: (successSnapshots, searchTerm) => {
    let filtered = successSnapshots;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((successSnapshots) =>
        successSnapshots.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortSuccessSnapshots: (successSnapshots, sortOrder) => {
    return [...successSnapshots].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateSuccessSnapshots: (successSnapshots, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return successSnapshots.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default successSnapshotsService;