const jobPostingService = {
  filterJobPosting: (jobPosting, searchTerm) => {
    let filtered = jobPosting;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((jobPosting) =>
        jobPosting.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortJobPosting: (jobPosting, sortOrder) => {
    return [...jobPosting].sort((a, b) => {
      const comparison = a.title.localeCompare(b.title);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateJobPosting: (jobPosting, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return jobPosting.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default jobPostingService;