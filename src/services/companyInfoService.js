const companyInfoService = {
  filterCompanyInfo: (companyInfo, searchTerm) => {
    let filtered = companyInfo;
    if (searchTerm.length >= 3) {
      filtered = filtered.filter((companyInfo) =>
        companyInfo.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  },

  sortCompanyInfo: (companyInfo, sortOrder) => {
    return [...companyInfo].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  },

  paginateCompanyInfo: (companyInfo, page, rowsPerPage) => {
    const startIndex = (page - 1) * rowsPerPage;
    return companyInfo.slice(startIndex, startIndex + rowsPerPage);
  },
};

export default companyInfoService;